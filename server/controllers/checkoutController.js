// import Cart from "../models/Cart"

// IMPORTAR STRIPE Y CONFIGURAR CLAVE DE STRIPE
import stripe from "stripe"
import dotenv from "dotenv"
import User from "./../models/User.js"
import Cart from "../models/Cart.js"

dotenv.config()

const stripeKey = stripe(process.env.STRIPE_SECRET_KEY)

const createCheckoutSession = async (req, res) => {
  console.log("accediste...")

  const userID = req.user.id
  console.log(userID)

  // 1. OBTENER EL USUARIO Y SU ID CON CORREO
  const foundUser = await User.findById(userID).lean()
  console.log(foundUser)

  // 2. CREACIÓN DEL CARRITO DE COMPRAS O OBTENCIÓN DEL USUARIO
  const foundCart = await Cart.findById(foundUser.cart).lean().populate({
    path: "products",
  })

  console.log(foundCart)

  const line_items = foundCart.products.map((e) => {
    return {
      price: e.priceID,
      quantity: e.quantity,
    }
  })

  // 3. CREACIÓN DE CHECKOUT EN STRIPE

  try {
    const session = await stripeKey.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: "https://google.com",
      cancel_url: "https://yahoo.com",
      customer_email: foundUser.email,
    })
    console.log("session", session)

    res.status(200).json({
      msg: "Accede a este link para la sesión de pago",
      session_url: session.url,
      session,
    })
  } catch (error) {
    console.log("error", error)
    res.status(400).json({
      msg: "Hubo un problema",
      error,
    })
  }
}

const createOrder = async (req, res) => {
  try {
    const sig = req.headers["stripe-signature"]
    const endpointSecret = process.env.STRIPE_WH_SIGNING_SECRET

    let event = stripeKey.webhooks.constructEvent(req.body, sig, endpointSecret)

    switch (event.type) {
      case "charge.succeeded":
        const paymentIntent = event.data.object

        const email = paymentIntent.billing_details.email
        const receiptURL = paymentIntent.receipt_url
        const receiptID = receiptURL
          .split("/")
          .filter((item) => item)
          .pop()
        const amount = paymentIntent.amount
        const date_created = paymentIntent.created

        console.log("email", email)
        console.log("receiptURL", receiptURL)
        console.log("receiptID", receiptID)
        console.log("amount", amount)
        console.log("date_created", date_created)

        const paymentDB = await User.findOneAndUpdate(
          { email },
          {
            $push: {
              receipts: {
                receiptURL,
                receiptID,
                date_created,
                amount,
              },
            },
          },
          { new: true }
        )

        console.log("paymentDB", paymentDB)

        res.status(200).json({
          msg: "Pago exitoso",
          paymentDB,
        })

        break

      default:
        console.log("Evento no encontrado")
        res.status(200).json({
          msg: "Evento no encontrado.",
        })
    }
  } catch (error) {
    console.log("error", error)
    res.status(400).json({
      msg: error,
    })
  }
}

const editCart = async (req, res) => {
  console.log(req.user)
  console.log(req.body)
  const userID = req.user.id

  console.log(userID)
  try {
    const foundUser = await User.findById(userID).lean()
    console.log(foundUser)

    const { products } = req.body

    const updatedCart = await Cart.findByIdAndUpdate(
      foundUser.cart,
      {
        products,
      },
      { new: true }
    )

    res.json({
      msg: "Tu carrito fue actualizado",
      updatedCart,
    })
  } catch (error) {
    console.log(error)
  }
}

const getCart = async (req, res) => {
  const userID = req.user.id

  const foundUser = await User.findById(userID).lean()
  const foundCart = await Cart.findOne({ _id: foundUser.cart }).lean()

  res.json({
    cart: foundCart,
  })
}

export default {
  createOrder,
  createCheckoutSession,
  editCart,
  getCart,
}

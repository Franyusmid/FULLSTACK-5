import Breaker from "../models/Breaker.js" /* se importa el modelo */
import stripe from "stripe"
import dotenv from "dotenv"

dotenv.config()

const stripeKey = stripe(process.env.STRIPE_SECRET_KEY)
// console.log("stripekey", stripeKey)
const readAll = async (req, res) => {
  try {
    const breakers = await Breaker.find()

    return res.json({
      message: "Datos de los breakers obtenidos con exito",
      data: breakers,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "Hubo un error obteniendo los datos",
    })
  }
}

const readone = async (req, res) => {
  const { id } = req.params

  try {
    const breaker = await Breaker.findOne({
      slug: id,
    })
    console.log(id)
    if (!breaker) {
      return res.status(400).json({
        msg: "Breaker no encontrado",
      })
    }
    return res.json({
      msg: "Breaker encontrado con exito",
      data: breaker,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "Hubo un erro obteniendo los datos",
    })
  }
}
const create = async (req, res) => {
  const { name, currency, prices, img, description, slug } = req.body

  // console.log(req.body)

  // A. GENERACIÓN DE PRODUCTO EN STRIPE
  // 1. CREAR EL PRODUCTO EN STRIPE

  try {
    const product = await stripeKey.products.create({
      name,
      description,
      images: [...img],
      metadata: {
        productDescription: description,
        slug,
      },
    })

    console.log("product", product)

    // 2. CREAR PRECIOS PARA EL PRODUCTO DE STRIPE
    const stripePrices = await Promise.all(
      prices.map(async (priceObj) => {
        return await stripeKey.prices.create({
          currency,
          product: product.id,
          unit_amount: priceObj.price,
          nickname: priceObj.size,
          metadata: {
            size: priceObj.size,
            priceDescription: priceObj.description,
          },
        })
      })
    )

    // console.log("stripePrices", stripePrices)

    // 3. CREACIÓN DE PRODUCTO EN BASE DE DATOS
    // A. ADAPTACIÓN DE VARIABLE. EN LUGAR DE PASAR LOS 50 MIL PROPIEDADES. SOLO NECESITO 4 PARA LA BASE DE DATOS CON RESPECTO A PRICING.
    const breakerPrices = stripePrices.map((priceObj) => {
      return {
        id: priceObj.id,
        size: priceObj.metadata.size,
        priceDescription: priceObj.metadata.priceDescription,
        price: priceObj.unit_amount,
      }
    })

    // B. CREACIÓN DE BREAKER DE BASE DE DATOS

    const newBreakerDB = await Breaker.create({
      idStripe: product.id,
      name: product.name,
      prices: breakerPrices,
      img,
      currency,
      description: product.description,
      slug,
    })

    return res.status(200).json({
      msg: "Breaker creado en Stripe y base de datos.)",
      data: newBreakerDB,
    })
  } catch (error) {
    console.log("error", error)
    return res.status(500).json({
      msg: "Hubo un problema creando el breaker",
      error,
    })
  }
}

const edit = async (req, res) => {
  const { id } = req.params
  const { name } = req.body

  try {
    const updatedBreaker = await Breaker.findByIdAndUpdate(
      id,
      {
        name,
      },
      { new: true }
    )

    return res.json({
      msg: "Breaker modificado con exito",
      data: updatedBreaker,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "Hubo un erro obteniendo los datos",
    })
  }
}

const deleteone = async (req, res) => {
  const { id } = req.params
  try {
    const deletedBreaker = await Breaker.findByIdAndDelete({
      _id: id,
    })

    if (deletedBreaker === null) {
      return res.json({
        msg: "El breaker no exixte o fue borrado con anterioridad",
      })
    }

    return res.json({
      msg: "Breaker eliminado",
      data: deletedBreaker,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "Hubo un error obteniendo los datos",
    })
  }
}

export default {
  readAll,
  create,
  readone,
  edit,
  deleteone,
}

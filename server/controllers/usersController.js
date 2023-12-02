import User from "../models/User.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

const readAll = async (req, res) => {
  try {
    const users = await User.find()
    console.log(users)
    return res.json({
      message: "Datos obtenidos con exito",
      data: users,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "Hubo un error obteniendo los datos",
    })
  }
}

const readOne = async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findOne({
      _id: id,
    })
    console.log(id)
    if (!user) {
      return res.status(400).json({
        msg: "Usuario no encontrado",
      })
    }
    return res.json({
      msg: "Usurio encontrado con exito",
      data: user,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "Hubo un erro obteniendo los datos",
    })
  }
}

const create = async (req, res) => {
  try {
    const { name, lastName, email, password } = req.body

    const salt = await bcryptjs.genSalt(10)

    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = await User.create({
      name,
      lastName,
      email,
      password: hashedPassword,
    })
    // CAPA DE SEGURIDAD JWT
    //1.GENERA UNA ELECCION DE DATSO (ID)-PAYLOAD
    const payload = {
      user: {
        id: newUser._id,
      },
    }

    // 2.ESTABLECER LA FIRMA JWT(SUPER SECRETA.SOLO LA TIENE EL CLIENTE Y EL SERVER)

    return jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: 3600000,
      },
      (error, token) => {
        if (error) {
          console.log("errr", error)
          return new Error(error)
        }
        return res.json({
          msg: "usurio Creado con exito y encriptado",
          data: token,
        })
      }
    )
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "Hubo un error obteniendo los datos o el usuario esta creado",
    })
  }
}

export default {
  readAll,
  create,
  readOne,
}

import Breaker from "../models/Breaker.js" /* se importa el modelo */

const readAll = async (req, res) => {
  try {
    const breakers = await Breaker.find()
    console.log(breakers)
    return res.json({
      message: "Datos de los breakers obtenidos con exito",
      data: breakers,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "Hubo un erro obteniendo los datos",
    })
  }
}

export default {
  readAll,
}

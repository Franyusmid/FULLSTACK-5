import Breaker from "../models/Breaker.js" /* se importa el modelo */

const readAll = async (req, res) => {
  try {
    const breakers = await Breaker.find()
    console.log(breakers)
    return res.json({
      message: "Datos de los breakers obtenidos con exito",
      data: breakers,
    })
  } catch (error) {}
}

const readOne = async (req, res) => {
  const { id } = req.params

  try {
    const breaker = await Breaker.findOne({
      _id: id,
    })
    console.log(id)
    if (!breaker) {
      return res.status(400).json({
        msg: "Breajer no encontrado",
      })
    }
    res.json({
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
  try {
    const { name } = req.body
    const newBreaker = await Breaker.create({
      name,
    })
    res.json({
      msg: "Breaker Creado",
      data: newBreaker,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "Hubo un erro obteniendo los datos",
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
  } catch (eror) {
    console.log(error)
    res.status(500).json({
      msg: "Hubo un erro obteniendo los datos",
    })
  }
}

const deleteone = async (req, res) => {
  const { id } = req.params
  try {
    const deleteBreaker = await Breaker.findByIdAndDelete({
      _id: id,
    })

    if (deleteBreaker === null) {
      return res.json({
        msg: "El braker no exixte o fue borrado con anterioridad",
      })
    }

    return res.json({
      msg: "Breaker eliminado",
      data: deleteBreaker,
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
  readOne,
  edit,
  deleteone,
}

import Fuse from "../models/Fuses.js"
/* se importa el modelo */

const readAll = async (req, res) => {
  try {
    const fuses = await Fuse.find()

    return res.json({
      message: "Datos de los Fusibles obtenidos con exito",
      data: fuses,
    })
  } catch (error) {}
}

const readOne = async (req, res) => {
  const { id } = req.params

  try {
    const fuse = await Fuse.findOne({
      _id: id,
    })
    console.log(id)
    if (!fuse) {
      return res.status(400).json({
        msg: "Fusible no encontrado",
      })
    }
    res.json({
      msg: "Fusible encontrado con exito",
      data: fuse,
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
    const { name, price, image, availability, slug } = req.body
    const newFuse = await Fuse.create({
      name,
      price,
      image,
      availability,
      slug,
    })
    return res.json({
      msg: "Fusible Creado",
      data: newFuse,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "Hubo un error obteniendo los datos",
    })
  }
}

const edit = async (req, res) => {
  const { id } = req.params
  const { name } = req.body

  try {
    const updatedFuse = await Fuse.findByIdAndUpdate(
      id,
      {
        name,
      },
      { new: true }
    )

    return res.json({
      msg: "Fusible modificado con exito",
      data: updatedFuse,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "Hubo un error obteniendo los datos",
    })
  }
}

const deleteone = async (req, res) => {
  const { id } = req.params
  try {
    const deleteFuse = await Fuse.findByIdAndDelete({
      _id: id,
    })

    if (deleteFuse === null) {
      return res.json({
        msg: "El Fusible no existe o fue borrado con anterioridad",
      })
    }

    return res.json({
      msg: "Fusible eliminado",
      data: deleteFuse,
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

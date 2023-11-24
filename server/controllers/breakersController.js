const readAll = (req, res) => {
  res.json({
    message: "Datos de los breakers obtenidos con exito",
    data: "",
  })
}

export default {
  readAll,
}

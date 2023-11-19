let data = [
  {
    id: 1,
    name: "mike",
  },
  {
    id: 2,
    name: "Ramiro",
  },
]

const readAll = (req, res) => {
  res.json({
    message: "Datos obtenidos con exito",
    data: data,
  })
}

export default {
  readAll,
}

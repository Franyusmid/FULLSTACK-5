import jwt from "jsonwebtoken"

const decrypt = async (req, res, next) => {
  // DESENCRIPTACIÓN DE DATOS
  const token = req.header("x-auth-token")
  console.log("token", token)

  if (!token) {
    return res.status(401).json({
      msg: "No hay token o es inválido. Vete lejos.",
    })
  }

  try {
    // TOKEN DESENCRIPTADO
    const openToken = await jwt.verify(token, process.env.JWT_SECRET)

    // PASARLO EN EL REQ.USER (req.body extensión)
    req.user = openToken.user

    next()
  } catch (error) {
    console.log("error", error)
    res.status(500).json({
      msg: "Hubo un error en servidor o token",
    })
  }
}

export default decrypt

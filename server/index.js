// 1. IMPORTACIONES

// A.imporaciones de librerias
import express from "express"
import cors from "cors"
import dotenv from "dotenv"

// B. importaciones de Archivos

import users from "./routes/users.js"

// 2.INICIALIZADORES
const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()

// opcinal

// 3. RUTAS

app.use("/api/v1/users", users)

// 4. LEVATAMIENTO DEL SERVIDOR

app.listen(process.env.BASE_URL_PORT, () =>
  console.log("EL servidor esta activo.")
)

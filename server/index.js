// 1. IMPORTACIONES

// A.imporaciones de librerias
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import swaggerUI from "swagger-ui-express"
import swaggerJSDoc from "swagger-jsdoc"
import path, { dirname } from "path"
import { fileURLToPath } from "url"

// B. importaciones de Archivos

import usersRoute from "./routes/users.js"
import breaksRoute from "./routes/breakers.js"
import connectDB from "./config/db.js"
import fusesRoute from "./routes/fuses.js"

// 2.INICIALIZADORES
const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()
connectDB()

const _filename = fileURLToPath(import.meta.url)
const _dirname = dirname(_filename)

const port = process.env.BASE_URL_PORT || 3005

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Documentacion de Proyecto 5",
      version: "1.0.0",
    },
  },
  apis: [`${path.join(_dirname, "./routes/*.js")}`],
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)
// opcinal

// 3. RUTAS
// A. APLICACION
app.use("/api/v1/users", usersRoute)
app.use("/api/v1/breakers", breaksRoute)
app.use("/api/v1/fuses", fusesRoute)

// B.DOCUMENTACION
app.use("/", swaggerUI.serve, swaggerUI.setup(swaggerDocs))

// 4. LEVATAMIENTO DEL SERVIDOR

app.listen(port, () => console.log("EL servidor esta activo."))

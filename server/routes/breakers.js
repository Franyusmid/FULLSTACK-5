// 1.Importaciones
// A.librerias
import express from "express"

// B.ARCHIVOS
import breakersController from "../controllers/breakersController.js"

// 2.INICIALIZADORES

const router = express.Router()

// 3.CONTROLADORES

/**
 * @swagger
 * /api/v1/breakers:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags:
 *       - Usuarios
 */

router.get("/", breakersController.readAll)

// 4.EXPORTACIONES

export default router

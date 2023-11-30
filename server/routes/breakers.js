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
// A. OBTENER UN BREAKER
router.get("/", breakersController.readAll)

// B.CREAR BREAKER
router.post("/create", breakersController.create)

// C. OBTENER UN BREAKER ESPECIFICO

router.get("/reaOne/:id", breakersController.readOne)

// D.MODIFICAR UN BREAKER

router.put("/updateone/:id", breakersController.edit)

// E.BORRAR UN BREAKER
router.delete("/deleteone/:id", breakersController.deleteone)

// 4.EXPORTACIONES

export default router

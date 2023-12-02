// 1.Importaciones
// A.librerias
import express from "express"

// B.ARCHIVOS
import fusesController from "./../controllers/fusesController.js"

// 2.INICIALIZADORES

const router = express.Router()

// 3.CONTROLADORES

/**
 * @swagger
 * /api/v1/fuses:
 *   get:
 *     summary: Obtener todos los Fusibles
 *     tags:
 *       - Usuarios
 */
// A. OBTENER UN FUSIBLE
router.get("/", fusesController.readAll)

// B.CREAR BREAKER
router.post("/create", fusesController.create)

// C. OBTENER UN FUSEIBLE ESPECIFICO

router.get("/readOne/:id", fusesController.readOne)

// D.MODIFICAR UN FUSIBLE

router.put("/updateone/:id", fusesController.edit)

// E.BORRAR UN FUSIBLE
router.delete("/deleteone/:id", fusesController.deleteone)

// 4.EXPORTACIONES

export default router

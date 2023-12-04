// 1.Importaciones
// A.librerias
import express from "express"
import authorization from "./../middleware/authotization.js"

// B.ARCHIVOS
import usersController from "./../controllers/usersController.js"

// 2.INICIALIZADORES

const router = express.Router()

// 3.CONTROLADORES

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags:
 *       - Usuarios
 */
// A. LEER USUARIOS
router.get("/", usersController.readAll)

// B.LEER UN USUARIO

router.get("/readone/:id", usersController.readOne)

// c.CREAR UN USUARIO

router.post("/create", usersController.create)

//  D. AUTENTICAR USUARIO
router.post("/login", usersController.login)

// E. AUTORIZACIÓN DE USUARIO
// INTEGRACIÓN DE MIDDLEWARES

router.get("/verifytoken", authorization, usersController.verifyToken)
// 4.EXPORTACIONES

export default router

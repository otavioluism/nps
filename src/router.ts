import { Router } from "express"
import UserController from './controllers/UserController'

const router = Router()

// instanciando minha classe para os metodos de criacao de um usuario
const userController = new UserController()

router.post("/users", userController.create)

export default router;


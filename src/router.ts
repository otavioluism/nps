import { Router } from "express"
import SurveysController from "./controllers/SurveysController"
import UserController from './controllers/UserController'

const router = Router()

// instanciando minha classe para os metodos de criacao de um usuario
const userController = new UserController()
const surveysController = new SurveysController()

router.post("/users", userController.create)
router.post("/surveys", surveysController.create)
router.get("/surveys", surveysController.show)

export default router;


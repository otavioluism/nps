import { Router } from "express"

import SurveysController from "./controllers/SurveysController"
import UserController from './controllers/UserController'
import SendMailController from "./controllers/SendEmailController"
import AnswerController from "./controllers/AnswerController"

const router = Router()

// instanciando minha classe para os metodos de criacao de um usuario
const userController = new UserController()
const surveysController = new SurveysController()
const sendMailController = new SendMailController()
const answerController = new AnswerController()


router.post("/users", userController.create)

router.post("/surveys", surveysController.create)
router.get("/surveys", surveysController.show)

router.post('/sendMail', sendMailController.execute)

router.get('/answers/:value', answerController.execute)

export default router;


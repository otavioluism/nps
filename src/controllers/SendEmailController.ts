import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'

import UsersRepository from '../repositories/UsersRepository'
import SurveyRepository from '../repositories/SurveysRepository'
import SurveyUserRepository from '../repositories/SurveyUserRepository'

class SendMailController { 

  async execute(request: Request, response: Response) { 
      const { email, survey_id } = request.body

      const usersRepository = getCustomRepository(UsersRepository)
      const surveyRepository = getCustomRepository(SurveyRepository)
      const surveyUserRepository = getCustomRepository(SurveyUserRepository)

      const userAlreadyExists = await usersRepository.findOne({ email })
      
      if (!userAlreadyExists) { 
        return response.status(400).json({error: "User dos not exists!"})
      }

      const surveyAlreadyExists = await surveyRepository.findOne({ id:  survey_id })

      if (!surveyAlreadyExists) { 
        return response.status(400).json({error: 'Survey does not exists!'})
      }

      const surveyUser = surveyUserRepository.create({
        user_id: userAlreadyExists.id,
        survey_id: surveyAlreadyExists.id
      })

      await surveyUserRepository.save(surveyUser)

      return response.json(surveyUser)
  }

}

export default SendMailController;
import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import path from 'path';

import UsersRepository from '../repositories/UsersRepository'
import SurveyRepository from '../repositories/SurveysRepository'
import SurveyUserRepository from '../repositories/SurveyUserRepository'

import SendMailService from '../services/SendMailService' 

class SendMailController { 

  async execute(request: Request, response: Response) { 
      const { email, survey_id } = request.body

      const usersRepository = getCustomRepository(UsersRepository)
      const surveyRepository = getCustomRepository(SurveyRepository)
      const surveyUserRepository = getCustomRepository(SurveyUserRepository)

      const user = await usersRepository.findOne({ email })
      
      if (!user) { 
        return response.status(400).json({error: "User dos not exists!"})
      }

      const survey = await surveyRepository.findOne({ id:  survey_id })

      if (!survey) { 
        return response.status(400).json({error: 'Survey does not exists!'})
      }

      const surveyUser = surveyUserRepository.create({
        user_id: user.id,
        survey_id
      })

      const variables = { 
        name: user.name,
        title: survey.title,
        description: survey.description,
        user_id: user.id,
        link: process.env.URL_MAIL,
      }

      // percorremos a pasta onde encontra o arquivo html
      const npsPath = path.resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs')

      const surveyUserAlreadyExists = await surveyUserRepository.findOne({
        where: [{user_id: user.id}, {value: null}],
        relations: ["user", "survey"]
      })

      if (surveyUserAlreadyExists) {
          await SendMailService.execute(email, survey.title, variables, npsPath)
          return response.json(surveyUserAlreadyExists)
      }

      await surveyUserRepository.save(surveyUser)

      await SendMailService.execute(email, survey.title ,variables , npsPath)

      return response.json(surveyUser)
  }

}

export default SendMailController;
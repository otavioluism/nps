import {Request, Response} from 'express'
import { getRepository } from 'typeorm';
import User from "../models/User"

class UserController { 

    async create(request: Request, response: Response) {
        const {name, email} = request.body;

        const usersRepository = getRepository(User);

        const userAlreadyExists = await usersRepository.findOne({email})

        if(userAlreadyExists){ 
            return response.status(400).json({message: "This email already exists"})
        }

        const user = usersRepository.create({
            name, email
        })

        await usersRepository.save(user)

        return response.status(201).json(user)
    }

}

export default UserController;
import express, { Request, Response } from 'express'
import { User } from '../db/users'
import { random, authentication } from '../helpers/cryptoAuth'

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.status(400).json({ message: "Field cannot be blank" })
        
        const user = await User.findOne({email}).select('+authentication.salt +authentication.password')
        if(!user) return res.status(401).json({ user: "User does not exist"})

        const expectedHash = authentication(user.authentication.salt, password)
        if(user.authentication.password !== expectedHash) return res.status(401).json({ message: 'Wrong Email or Password' })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error })
    }
}

export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body
        if(!username || !email || !password) return res.sendStatus(400)

        const existingUser = await User.findOne({email})
        if (existingUser) return res.status(400).json({ message: "User already exists" })

        const salt = random()
        const user = await User.create({
            username,
            email,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        })
        return res.status(200).json(user).end() 

    } catch (error) { 
        console.log(error)
        return res.status(400).json({ error })
    }
}
 
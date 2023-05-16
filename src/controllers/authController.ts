import express, { Request, Response } from 'express'
import { User } from '../db/users'
import { random, authentication } from '../helpers/index'

export const register =async (req: Request, res: Response) => {
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
        return res.status(200).json(user)

    } catch (error) { 
        console.log(error)
        return res.status(400).json({ error })
    }
}
 
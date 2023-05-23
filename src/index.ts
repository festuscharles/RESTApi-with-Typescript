import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv'
import router from './router/userRouter'

dotenv.config()

// Database Connection 
mongoose.connect(`${process.env.MONGODB_URI}`)

const db = mongoose.connection
db.on('err', (err) => console.log(err))
db.once('open', () => console.log('Database Connection Established'))

// Middleware for handling errors
const app = express()

app.use(cors({
    credentials: true
}))

app.use(compression())
app.use(cookieParser())
app.use(express.json())

app.use('/', router())

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
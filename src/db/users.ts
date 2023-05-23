import mongoose from 'mongoose'
const Schema = mongoose.Schema

interface userData {
    _id?: string,
    username: string,
    email: string,
    authentication: {
        password: string,
        salt: string,
        sessionToken: string
    }
}

const userSchema = new Schema<userData>({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    authentication: {
        password: {
            type: String,
            required: true,
            select: false
        },
        salt: {
            type: String,
            select: false
        },
        sessionToken: {
            type: String,
            select: false
        }
    }
})

export const User = mongoose.model<userData>('User', userSchema)


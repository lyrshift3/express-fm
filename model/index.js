import mongoose from 'mongoose'
import config from '../config/config.default.js'
import { userSchema } from './userModel.js'

async function connectDB() {
    try {
        await mongoose.connect(config.mongodb.uri)
        console.log('Connected to MongoDB')
    }
    catch (err) {
        console.error('Failed to connect to MongoDB', err)
    }
}
connectDB().then(() => {
    console.log('DB connected')
}).catch(err => {
    console.error('DB connection error', err)
})

export const User = mongoose.model('User', userSchema)


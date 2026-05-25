import mongoose from 'mongoose'
import md5 from '../util/md5.js'

export const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true, set: value => md5(value) },
    phone: { type: String, required: true },
    image: { type: String, default: null },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() }
})

// 输出时自动剔除密码字段（res.json 时会自动调用 toJSON）
userSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password
        delete ret.__v
        return ret
    }
})
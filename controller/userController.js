import { User } from '../model/index.js'
import { signToken } from '../util/jwt.js'
import crypto from 'crypto'

const md5 = (value) => crypto.createHash('md5').update(value).digest('hex')

export const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ err: '获取用户列表失败' })
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ err: '用户不存在' })
        }
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ err: '获取用户失败' })
    }
}

export const addUser = async (req, res) => {
    try {
        const body = req.body
        const user = new User(body)
        await user.save()
        res.status(201).json({ msg: '用户添加成功', data: user })
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ err: '用户名已存在' })
        }
        res.status(500).json({ err: '用户添加失败' })
    }
}

export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true, runValidators: true })
        if (!user) {
            return res.status(404).json({ err: '用户不存在' })
        }
        res.status(200).json({ msg: '用户更新成功', data: user })
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ err: '用户名已存在' })
        }
        res.status(500).json({ err: '用户更新失败' })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).json({ err: '用户不存在' })
        }
        res.status(200).json({ msg: '用户删除成功' })
    } catch (err) {
        res.status(500).json({ err: '用户删除失败' })
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        // const user = await User.findOne({
        //     $or: [{ username }, { email: username }]
        // })
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(401).json({ err: '用户名或密码错误' })
        }
        if (user.password !== md5(password)) {
            return res.status(401).json({ err: '用户名或密码错误' })
        }

        // 生成 JWT token
        const token = await signToken({ id: user._id, username: user.username })

        res.status(200).json({ msg: '登录成功', data: user, token })
    } catch (err) { 
        res.status(500).json({ err: '登录失败' })
    }
}

export const register = async (req, res) => {
    try {
        const user = new User(req.body)
        const dbBack = await user.save()
        res.status(201).json(dbBack)
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ err: '用户名已存在' })
        }
        res.status(500).json({ err: '注册失败' })
    }
}

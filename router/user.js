import express from 'express'
import validate from '../middleware/validator/errorBack.js'
import { registerValidator, addUserValidator, updateUserValidator, loginValidator } from '../middleware/validator/userValidator.js'
import { getUsers, getUser, addUser, updateUser, deleteUser, login, register } from '../controller/index.js'
import { authMiddleware } from '../util/jwt.js'

const router = express.Router()

// 公开接口（无需登录）
router.post('/register', validate(registerValidator), register)
router.post('/login', validate(loginValidator), login)

// 需要登录认证的接口
router.get('/', authMiddleware, getUsers)
router.get('/:id', authMiddleware, getUser)
router.post('/', authMiddleware, validate(addUserValidator), addUser)
router.put('/:id', authMiddleware, validate(updateUserValidator), updateUser)
router.delete('/:id', authMiddleware, deleteUser)

export default router

import express from 'express'
import upload from '../util/upload.js'
import { authMiddleware } from '../util/jwt.js'
import { uploadFile, uploadAvatar, uploadCover } from '../controller/index.js'

const router = express.Router()

// 所有上传接口均需登录
router.use(authMiddleware)

// 通用文件上传（单文件，字段名: file）
router.post('/', (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      // multer 错误处理（文件过大、类型不对等）
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ err: '文件大小不能超过 5MB' })
      }
      return res.status(400).json({ err: err.message })
    }
    next()
  })
}, uploadFile)

// 上传头像（自动更新用户 image）
router.post('/avatar', (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ err: '文件大小不能超过 5MB' })
      }
      return res.status(400).json({ err: err.message })
    }
    next()
  })
}, uploadAvatar)

// 上传封面（自动更新用户 cover）
router.post('/cover', (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ err: '文件大小不能超过 5MB' })
      }
      return res.status(400).json({ err: err.message })
    }
    next()
  })
}, uploadCover)

export default router

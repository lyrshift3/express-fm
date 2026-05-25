import express from 'express'
import userRouter from './user.js'
import videoRouter from './video.js'

const router = express.Router()

router.use('/user', userRouter)
router.use('/video', videoRouter)

export default router
import express from 'express'
import { getVideos, addVideo, updateVideo } from '../controller/index.js'

const router = express.Router()

router.get('/', getVideos)
router.post('/users', addVideo)
router.put('/:id', updateVideo)

export default router

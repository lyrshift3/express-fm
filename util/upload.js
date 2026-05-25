import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 上传根目录
const UPLOAD_DIR = path.resolve(__dirname, '..', 'uploads')

// 确保上传目录存在
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true })
}

// 文件类型白名单
const MIME_TYPE_MAP = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/gif': '.gif',
  'image/webp': '.webp',
}

// 生成唯一文件名
function generateFileName(originalname, ext) {
  const timestamp = Date.now()
  const random = Math.round(Math.random() * 1e9)
  const sanitized = originalname
    .replace(/\.[^.]+$/, '')       // 去掉原扩展名
    .replace(/[^a-zA-Z0-9\u4e00-\u9fa5_-]/g, '') // 去特殊字符
    .slice(0, 20)                  // 截短
  return `${sanitized}-${timestamp}-${random}${ext}`
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR)
  },
  filename: (req, file, cb) => {
    const ext = MIME_TYPE_MAP[file.mimetype]
    if (!ext) {
      return cb(new Error('不支持的文件类型，仅支持 jpg/png/gif/webp'))
    }
    const filename = generateFileName(file.originalname, ext)
    cb(null, filename)
  },
})

const fileFilter = (req, file, cb) => {
  if (MIME_TYPE_MAP[file.mimetype]) {
    cb(null, true)
  } else {
    cb(new Error('不支持的文件类型，仅支持 jpg/png/gif/webp'), false)
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
})

export default upload

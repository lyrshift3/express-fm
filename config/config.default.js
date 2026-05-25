export default {
  // JWT 密钥，生产环境请通过环境变量 JWT_SECRET 覆盖
  jwt: {
    secret: process.env.JWT_SECRET || 'express-fm-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  // MongoDB 连接配置，生产环境请通过环境变量 MONGODB_URI 覆盖
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/express-video',
  },
}

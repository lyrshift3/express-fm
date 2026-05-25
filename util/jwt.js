import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import config from '../config/config.default.js'

const { secret: JWT_SECRET, expiresIn: JWT_EXPIRES_IN } = config.jwt

const jwtVerifyAsync = promisify(jwt.verify)
const jwtSignAsync = promisify(jwt.sign)

/**
 * 生成 JWT token（基于 promisify 的异步实现）
 * @param {Object} payload - 要加密的数据（如用户 id、username）
 * @param {Object} [options] - 可选配置
 * @param {string} [options.expiresIn] - 过期时间（默认 7d）
 * @returns {Promise<string>} JWT token
 */
export async function signToken(payload, options = {}) {
  const { expiresIn = JWT_EXPIRES_IN } = options
  return await jwtSignAsync(payload, JWT_SECRET, { expiresIn })
}

/**
 * 验证 JWT token（基于 promisify 的异步实现）
 * @param {string} token - JWT token
 * @returns {Promise<Object>} 解码后的 payload
 * @throws {Error} token 无效或已过期时抛出错误
 */
export async function verifyToken(token) {
  return await jwtVerifyAsync(token, JWT_SECRET)
}

/**
 * 从请求头中提取并验证 token 的中间件
 * @param {Object} req - Express 请求对象
 * @param {Object} res - Express 响应对象
 * @param {Function} next - Express next 函数
 */
export async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ err: '未提供认证 token' })
  }

  // 支持 Bearer Token 格式
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : authHeader

  try {
    const decoded = await verifyToken(token)
    req.user = decoded // 将用户信息挂载到 req 上，后续中间件/路由可访问
    next()
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ err: 'token 已过期，请重新登录' })
    }
    return res.status(401).json({ err: '无效的 token' })
  }
}

/**
 * 从请求头中解析并验证 token，但不会阻止请求继续
 * 验证失败时 req.user 为 null，成功时挂载用户信息
 * @param {Object} req - Express 请求对象
 * @param {Object} res - Express 响应对象
 * @param {Function} next - Express next 函数
 */
export async function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    req.user = null
    return next()
  }

  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : authHeader

  try {
    req.user = await verifyToken(token)
  } catch {
    req.user = null
  }
  next()
}

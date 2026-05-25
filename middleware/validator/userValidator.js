import { body } from 'express-validator'

const baseUserValidation = [
    body('username').notEmpty().withMessage('用户名不能为空').bail().isLength({ min: 3 }).withMessage('用户名长度不能少于3个字符'),
    body('email').notEmpty().withMessage('邮箱不能为空').bail().isEmail().withMessage('邮箱格式不正确'),
    body('password').notEmpty().withMessage('密码不能为空').bail().isLength({ min: 6 }).withMessage('密码长度不能少于6个字符'),
    body('phone').notEmpty().withMessage('手机号不能为空').bail().matches(/^1[3-9]\d{9}$/).withMessage('手机号格式不正确'),
]

export const registerValidator = [...baseUserValidation]

export const addUserValidator = [
    body('username').notEmpty().withMessage('用户名不能为空').bail().isLength({ min: 3 }).withMessage('用户名长度不能少于3个字符'),
    body('email').optional({ values: 'null' }).isEmail().withMessage('邮箱格式不正确'),
    body('password').optional({ values: 'null' }).isLength({ min: 6 }).withMessage('密码长度不能少于6个字符'),
    body('phone').optional({ values: 'null' }).matches(/^1[3-9]\d{9}$/).withMessage('手机号格式不正确'),
]

export const updateUserValidator = [
    body('username').optional().isLength({ min: 3 }).withMessage('用户名长度不能少于3个字符'),
    body('email').optional().isEmail().withMessage('邮箱格式不正确'),
    body('password').optional().isLength({ min: 6 }).withMessage('密码长度不能少于6个字符'),
    body('phone').optional().matches(/^1[3-9]\d{9}$/).withMessage('手机号格式不正确'),
]

export const loginValidator = [
    body('username').notEmpty().withMessage('用户名不能为空'),
    body('password').notEmpty().withMessage('密码不能为空'),
]
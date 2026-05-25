import swaggerJsdoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express-FM API 文档',
      version: '1.0.0',
      description: '用户管理 RESTful API 接口文档',
      contact: {
        name: '开发者',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: '本地开发服务器',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: '输入 JWT token，前缀 Bearer 可省略',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'MongoDB 自动生成的用户 ID',
              example: '6617f3a4e8b0a1b2c3d4e5f6',
            },
            username: {
              type: 'string',
              description: '用户名',
              example: 'lyr',
            },
            email: {
              type: 'string',
              description: '邮箱',
              example: 'lyr@example.com',
            },
            password: {
              type: 'string',
              description: '密码',
              example: '123456',
            },
            phone: {
              type: 'string',
              description: '手机号',
              example: '13800138000',
            },
            image: {
              type: 'string',
              description: '头像 URL',
              example: null,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: '创建时间',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: '更新时间',
            },
          },
        },
        UserInput: {
          type: 'object',
          required: ['username'],
          properties: {
            username: {
              type: 'string',
              description: '用户名（至少3个字符）',
              example: 'newuser',
            },
            email: {
              type: 'string',
              description: '邮箱',
              example: 'newuser@example.com',
            },
            password: {
              type: 'string',
              description: '密码（至少6个字符）',
              example: 'pass123',
            },
            phone: {
              type: 'string',
              description: '手机号（11位）',
              example: '13900139000',
            },
            image: {
              type: 'string',
              description: '头像 URL',
              example: null,
            },
          },
        },
        LoginInput: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: {
              type: 'string',
              description: '用户名或邮箱',
              example: 'lyr',
            },
            password: {
              type: 'string',
              description: '密码',
              example: '123456',
            },
          },
        },
        LoginSuccessResponse: {
          type: 'object',
          properties: {
            msg: {
              type: 'string',
              example: '登录成功',
            },
            data: {
              type: 'object',
              properties: {
                _id: { type: 'string', example: '6617f3a4e8b0a1b2c3d4e5f6' },
                username: { type: 'string', example: 'lyr' },
                email: { type: 'string', example: 'lyr@example.com' },
                phone: { type: 'string', example: '13800138000' },
                image: { type: 'string', example: null },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },
              },
            },
            token: {
              type: 'string',
              description: 'JWT token，后续请求需在 Authorization 头中携带',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            },
          },
        },
        RegisterInput: {
          type: 'object',
          required: ['username', 'email', 'password', 'phone'],
          properties: {
            username: {
              type: 'string',
              description: '用户名（至少3个字符）',
              example: 'newuser',
            },
            email: {
              type: 'string',
              description: '邮箱',
              example: 'newuser@example.com',
            },
            password: {
              type: 'string',
              description: '密码（至少6个字符）',
              example: 'pass123',
            },
            phone: {
              type: 'string',
              description: '手机号（11位）',
              example: '13900139000',
            },
            image: {
              type: 'string',
              description: '头像 URL',
              example: null,
            },
          },
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            msg: {
              type: 'string',
              example: '操作成功',
            },
            data: {
              $ref: '#/components/schemas/User',
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            err: {
              type: 'string',
              example: '错误信息',
            },
          },
        },
        UnauthorizedError: {
          type: 'object',
          properties: {
            err: {
              type: 'string',
              example: '未提供认证 token',
            },
          },
        },
        ValidationError: {
          type: 'object',
          properties: {
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  type: { type: 'string' },
                  msg: { type: 'string' },
                  path: { type: 'string' },
                  location: { type: 'string' },
                },
              },
            },
          },
        },
        FileUploadResponse: {
          type: 'object',
          properties: {
            msg: { type: 'string', example: '上传成功' },
            data: {
              type: 'object',
              properties: {
                url: { type: 'string', example: '/uploads/avatar-1719123456789-123456789.jpg' },
                originalname: { type: 'string', example: 'myphoto.jpg' },
                filename: { type: 'string', example: 'avatar-1719123456789-123456789.jpg' },
                size: { type: 'number', example: 102400 },
                mimetype: { type: 'string', example: 'image/jpeg' },
              },
            },
          },
        },
        ProfileUploadResponse: {
          type: 'object',
          properties: {
            msg: { type: 'string', example: '头像上传成功' },
            data: {
              type: 'object',
              properties: {
                url: { type: 'string', example: '/uploads/avatar-1719123456789-123456789.jpg' },
                user: {
                  type: 'object',
                  properties: {
                    _id: { type: 'string', example: '6617f3a4e8b0a1b2c3d4e5f6' },
                    username: { type: 'string', example: 'lyr' },
                    image: { type: 'string', example: '/uploads/avatar-1719123456789-123456789.jpg', nullable: true },
                    cover: { type: 'string', example: '/uploads/cover-1719123456789-123456789.jpg', nullable: true },
                  },
                },
              },
            },
          },
        },
      },
    },
    paths: {
      '/user': {
        post: {
          tags: ['用户管理'],
          summary: '添加用户',
          description: '创建一个新用户（username 必填，其他字段可选，需登录）',
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UserInput',
                },
              },
            },
          },
          responses: {
            401: {
              description: '未认证或 token 无效',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/UnauthorizedError' },
                },
              },
            },
            201: {
              description: '用户创建成功',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      msg: { type: 'string', example: '用户添加成功' },
                      data: { $ref: '#/components/schemas/User' },
                    },
                  },
                },
              },
            },
            401: {
              description: '参数校验失败',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ValidationError',
                  },
                },
              },
            },
            409: {
              description: '用户名已存在',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                  example: { err: '用户名已存在' },
                },
              },
            },
            500: {
              description: '服务器错误',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                  example: { err: '用户添加失败' },
                },
              },
            },
          },
        },
        put: {
          tags: ['用户管理'],
          summary: '修改个人信息',
          description: '修改当前登录用户的个人信息（所有字段可选，根据 token 自动识别用户身份，需登录）',
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    username: {
                      type: 'string',
                      description: '用户名（至少3个字符）',
                      example: 'updatedname',
                    },
                    email: {
                      type: 'string',
                      description: '邮箱（不可与其他用户重复）',
                      example: 'updated@example.com',
                    },
                    password: {
                      type: 'string',
                      description: '密码（至少6个字符）',
                      example: 'newpass123',
                    },
                    phone: {
                      type: 'string',
                      description: '手机号（不可与其他用户重复）',
                      example: '13700137000',
                    },
                    image: {
                      type: 'string',
                      description: '头像 URL',
                      example: 'https://example.com/avatar.png',
                    },
                  },
                },
              },
            },
          },
          responses: {
            401: {
              description: '未认证或 token 无效',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/UnauthorizedError' },
                },
              },
            },
            200: {
              description: '用户更新成功',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      msg: { type: 'string', example: '用户更新成功' },
                      data: { $ref: '#/components/schemas/User' },
                    },
                  },
                },
              },
            },
            401: {
              description: '参数校验失败',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ValidationError',
                  },
                },
              },
            },
            404: {
              description: '用户不存在（token 对应的用户已被删除）',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                  example: { err: '用户不存在' },
                },
              },
            },
            409: {
              description: '数据冲突（用户名/邮箱/手机号已被其他用户使用）',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                  example: { err: '邮箱已被其他用户使用' },
                },
              },
            },
            500: {
              description: '服务器错误',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                  example: { err: '用户更新失败' },
                },
              },
            },
          },
        },
      },
      '/user/lists': {
        get: {
          tags: ['用户管理'],
          summary: '获取用户列表',
          description: '返回所有用户的数组（需登录）',
          security: [{ BearerAuth: [] }],
          responses: {
            401: {
              description: '未认证或 token 无效',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/UnauthorizedError' },
                },
              },
            },
            200: {
              description: '成功返回用户列表',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/User',
                    },
                  },
                },
              },
            },
            500: {
              description: '服务器错误',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                  example: { err: '获取用户列表失败' },
                },
              },
            },
          },
        },
      },
      '/user/{id}': {
        get: {
          tags: ['用户管理'],
          summary: '获取单个用户',
          description: '根据用户 ID 获取用户详情（需登录）',
          security: [{ BearerAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: '用户的 MongoDB ObjectId（24位十六进制）',
              schema: {
                type: 'string',
                example: '6617f3a4e8b0a1b2c3d4e5f6',
              },
            },
          ],
          responses: {
            401: {
              description: '未认证或 token 无效',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/UnauthorizedError' },
                },
              },
            },
            200: {
              description: '成功返回用户信息',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
            },
            404: {
              description: '用户不存在',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                  example: { err: '用户不存在' },
                },
              },
            },
            500: {
              description: '服务器错误',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                  example: { err: '获取用户失败' },
                },
              },
            },
          },
        },
        delete: {
          tags: ['用户管理'],
          summary: '删除用户',
          description: '根据用户 ID 删除用户（需登录）',
          security: [{ BearerAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: '用户的 MongoDB ObjectId',
              schema: {
                type: 'string',
                example: '6617f3a4e8b0a1b2c3d4e5f6',
              },
            },
          ],
          responses: {
            401: {
              description: '未认证或 token 无效',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/UnauthorizedError' },
                },
              },
            },
            200: {
              description: '用户删除成功',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      msg: { type: 'string', example: '用户删除成功' },
                    },
                  },
                },
              },
            },
            404: {
              description: '用户不存在',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                  example: { err: '用户不存在' },
                },
              },
            },
            500: {
              description: '服务器错误',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                  example: { err: '用户删除失败' },
                },
              },
            },
          },
        },
      },
      '/user/login': {
        post: {
          tags: ['用户管理'],
          summary: '用户登录',
          description: '通过用户名（或邮箱）+ 密码登录',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/LoginInput',
                },
              },
            },
          },
          responses: {
            200: {
              description: '登录成功',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/LoginSuccessResponse',
                  },
                },
              },
            },
            401: {
              description: '参数校验失败 或 用户名/密码错误',
              content: {
                'application/json': {
                  oneOf: [
                    {
                      schema: { $ref: '#/components/schemas/ValidationError' },
                    },
                    {
                      schema: { $ref: '#/components/schemas/ErrorResponse' },
                      example: { err: '用户名或密码错误' },
                    },
                  ],
                },
              },
            },
            500: {
              description: '服务器错误',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                  example: { err: '登录失败' },
                },
              },
            },
          },
        },
      },
      '/user/register': {
        post: {
          tags: ['用户管理'],
          summary: '用户注册',
          description: '注册新用户（所有字段必填）',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RegisterInput',
                },
              },
            },
          },
          responses: {
            201: {
              description: '注册成功',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
            },
            401: {
              description: '参数校验失败',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ValidationError',
                  },
                },
              },
            },
            409: {
              description: '用户名已存在',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                  example: { err: '用户名已存在' },
                },
              },
            },
            500: {
              description: '服务器错误',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                  example: { err: '注册失败' },
                },
              },
            },
          },
        },
      },
      '/upload': {
        post: {
          tags: ['文件上传'],
          summary: '通用文件上传',
          description: '上传单个文件（图片），返回文件访问 URL（需登录）',
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  properties: {
                    file: {
                      type: 'string',
                      format: 'binary',
                      description: '上传的图片文件（支持 jpg/png/gif/webp，最大 5MB）',
                    },
                  },
                  required: ['file'],
                },
              },
            },
          },
          responses: {
            401: {
              description: '未认证或 token 无效',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/UnauthorizedError' },
                },
              },
            },
            200: {
              description: '上传成功',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/FileUploadResponse' },
                },
              },
            },
            400: {
              description: '文件校验失败（未选择文件/类型不对/超过大小限制）',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                  example: { err: '文件大小不能超过 5MB' },
                },
              },
            },
            500: {
              description: '服务器错误',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                  example: { err: '上传失败' },
                },
              },
            },
          },
        },
      },
      '/upload/avatar': {
        post: {
          tags: ['文件上传'],
          summary: '上传头像',
          description: '上传头像图片并自动更新当前登录用户的 image 字段（需登录）',
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  properties: {
                    file: {
                      type: 'string',
                      format: 'binary',
                      description: '头像图片（支持 jpg/png/gif/webp，最大 5MB）',
                    },
                  },
                  required: ['file'],
                },
              },
            },
          },
          responses: {
            401: {
              description: '未认证或 token 无效',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/UnauthorizedError' },
                },
              },
            },
            200: {
              description: '头像上传成功',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ProfileUploadResponse' },
                },
              },
            },
            400: {
              description: '文件校验失败',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                  example: { err: '文件大小不能超过 5MB' },
                },
              },
            },
            404: {
              description: '用户不存在',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                  example: { err: '用户不存在' },
                },
              },
            },
            500: {
              description: '服务器错误',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                  example: { err: '头像上传失败' },
                },
              },
            },
          },
        },
      },
      '/upload/cover': {
        post: {
          tags: ['文件上传'],
          summary: '上传封面',
          description: '上传封面图片并自动更新当前登录用户的 cover 字段（需登录）',
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  properties: {
                    file: {
                      type: 'string',
                      format: 'binary',
                      description: '封面图片（支持 jpg/png/gif/webp，最大 5MB）',
                    },
                  },
                  required: ['file'],
                },
              },
            },
          },
          responses: {
            401: {
              description: '未认证或 token 无效',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/UnauthorizedError' },
                },
              },
            },
            200: {
              description: '封面上传成功',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ProfileUploadResponse' },
                },
              },
            },
            400: {
              description: '文件校验失败',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                  example: { err: '文件大小不能超过 5MB' },
                },
              },
            },
            404: {
              description: '用户不存在',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                  example: { err: '用户不存在' },
                },
              },
            },
            500: {
              description: '服务器错误',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                  example: { err: '封面上传失败' },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [],
}

export const swaggerSpec = swaggerJsdoc(options)

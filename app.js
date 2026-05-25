import { log } from 'console'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './swagger.js'
import router from './router/index.js'

const app = express()

// Swagger 接口文档
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Express-FM API 文档',
}))

//app.use(express.urlencoded({ extended: true })) // 解析 URL-encoded 请求体
app.use(express.json()) // 解析 JSON 请求体
app.use(cors()) // 允许跨域请求
app.use(morgan('dev'))
app.use('/api/v1', router)   //例：http://localhost:3000/api/v1/user/
// app.use((req, res) => {
//     res.status(404).json({ err: '接口不存在' })
// })
// app.use((err, req, res, next) => {
//     console.log("xx")
//     res.status(500).send("服务器错误")
// })


// app.all('/x', (req, res) => {
//     console.log("xx")
// })

app.get('/us*er', (req, res) => {
    console.log('lyr')
    res.send(`${req.method} --- ${req.url}`)
})

app.get('/user/:id/video/:videoId', (req, res) => {
    console.log('lyr')
    res.send(`${req.method} --- ${req.url} --- ${req.params.id} --- ${req.params.videoId}`)
})
//----------------------------------
app
.get("/x", (req, res) => {
    console.log("xx")
    res.send("xx")
})   
.post("/y", (req, res) => {
    console.log("yy")
    res.send("yy")
})  
//----------------------------------
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

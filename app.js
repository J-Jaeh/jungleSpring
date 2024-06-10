import express from 'express'
import * as dotenv from 'dotenv'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import routes from './routes/index.js'
import connect from './config/db.js'
import cookieParser from 'cookie-parser';

//순서 중요한듯 ?
dotenv.config()
const PORT = process.env.PORT || 3030;
export const SECRETKEY = process.env.SECRETKEY
export const DB_URL = process.env.DB_URL
const app = express()
connect()

// Swagger UI 경로 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(morgan(":method :status :url :response-time ms"));
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', routes)


app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 시작되었습니다.`)
})
import express from 'express'
import * as dotenv from 'dotenv'
import routes from './routes/index.js'
import connect from './config/db.js'

const PORT = process.env.PORT || 3030;
const app = express()

dotenv.config()
connect()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', routes)


app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 시작되었습니다.`)
})
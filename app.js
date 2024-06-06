import express from 'express'
import routes from './routes/index.js'
import connect from './schemas/index.js'

const port = 3000
connect()


let app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', routes)


app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 시작되었습니다.`)
})
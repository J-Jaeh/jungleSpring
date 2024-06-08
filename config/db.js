import mongoose from 'mongoose'
import { DB_URL } from '../app.js'
// import * as dotenv from 'dotenv'
// dotenv.config()
// const DB_URL = process.env.DB_URL

const connect = () => {
  mongoose
    .connect(DB_URL)
    .catch(err => console.log(err))
}

mongoose.connection.on('error', err => {
  console.error('몽고디비 연결 에러', err)
})

export default connect

import mongoose from 'mongoose'
// import * as dotenv from 'dotenv'
// dotenv.config()
// const DB_URL = process.env.DB_URL

const connect = () => {
  mongoose
    .connect('mongodb://localhost:27017/post_project')
    .catch(err => console.log(err))
}

mongoose.connection.on('error', err => {
  console.error('몽고디비 연결 에러', err)
})

export default connect

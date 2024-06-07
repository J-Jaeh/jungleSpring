import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import User from '../schemas/user.js'

dotenv.config()
const router = express.Router()
const SECRETKEY = process.env.SECRETKEY


/**
 * 회원가입
 */
router.post('/register', async (req, res) => {
  const { nickname, password, checkPassword } = req.body
  if (checkPassword !== password) {
    return res.status(401).send({ error: 'Passwords do not match' })
  }

  ///어차피 예외를 db 조회할때 처리할건데 ..
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = new User({ nickname: nickname, password: hashedPassword })
  try {
    await user.save()
    res.status(200).send({ success: true, user_id: user._id })
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).send({ success: false, errorMessage: 'User already exists' })
    }
    if (err.name === 'ValidationError') {
      console.error('ValidationError')
      return res.status(400).send({ success: false, errorMessage: err.message })
    }
  }
})

/**
 * 로그인
 */
router.post('/login', async (req, res) => {
  const { nickname, password } = req.body

  const user = await User.findOne({ nickname: nickname }).exec()
  if (!user) return res.status(400).send({
    success: false,
    errorMessage: 'Incorrect Username or Password, or Unregistered User',
  })

  const isSame = bcrypt.compare(password, user.password)

  if (!isSame) {
    return res.status(400).send({
      success: false,
      errorMessage: 'Incorrect Username or Password, or Unregistered User',
    })
  }

  const token = jwt.sign({ nickname: user.nickname }, SECRETKEY);

  res.cookie('Authorization',`Bearer ${token}`)
  return res.status(200).send({success: true})

})

export default router
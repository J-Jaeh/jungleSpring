import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../schemas/user.js'
import { SECRETKEY } from '../app.js'

const router = express.Router()


/**
 * 회원가입
 */
router.post('/register', async (req, res) => {
  const { nickname, password, checkPassword } = req.body
  if (checkPassword !== password) {
    return res.status(400).send({ error: 'Passwords do not match' })
  }
  if(password.includes(nickname)) {
    return res.status(400).send({ error: '비밀번호에는 닉네임을 포함할 수 없습니다' })
  }


  ///어차피 예외를 db 조회할때 처리할건데 ..
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = new User({ nickname: nickname, password: hashedPassword })
  try {
    await user.save()
    res.status(200).send({ success: true, user_id: user._id })
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).send({ success: false, errorMessage: 'User already exists' })
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
  if (!user) return res.status(401).send({
    success: false,
    errorMessage: 'Incorrect Username or Password, or Unregistered User',
  })

  //비동기함수라 await 걸어야함
  const isSame = await bcrypt.compare(password, user.password)

  if (!isSame) {
    return res.status(401).send({
      success: false,
      errorMessage: 'Incorrect Username or Password, or Unregistered User',
    })
  }

  const token = jwt.sign({ nickname: user.nickname }, SECRETKEY);

  res.cookie('Authorization',`Bearer ${token}`)
  return res.status(200).send({success: true})

})

export default router
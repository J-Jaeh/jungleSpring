import express from 'express'
import { generateJwtToken, comparePassword,hashedPassword } from '../utils/auth-util.js'
import { UserService } from '../services/userService.js'

const router = express.Router()

const userService = new UserService()

/**
 * 회원가입
 */
router.post('/register', async (req, res) => {
  const { nickname, password, checkPassword } = req.body
  if (checkPassword !== password) {
    return res.status(400).send({ error: 'Passwords do not match' })
  }
  if (password.includes(nickname)) {
    return res.status(400).send({ error: '비밀번호에는 닉네임을 포함할 수 없습니다' })
  }
  hashedPassword(res,password)
  const hashPassword  = await res.locals.hashedPassword
  try {
    const user = await userService.registerUser({ nickname: nickname, password:hashPassword  })
    console.log("user=",user)
    console.log("userId =",user._id)
    res.status(200).send({ success: true, user_id: user._id })
  } catch (err) {
    if (err.code === 11000)
      return res.status(409).send({ success: false, errorMessage: 'User already exists' })
    if (err.name === 'ValidationError') {
      console.error('ValidationError')
      return res.status(400).send({ success: false, errorMessage: err.message })
    }
    console.error('Error')
    return res.status(400).send({ success: false, errorMessage: err.message })
  }
})

/**
 * 로그인
 */
router.post('/login', async (req, res) => {
  const { nickname, password } = req.body
  try {
    const loginUser= await userService.loginUser({ nickname: nickname, password: password })
    comparePassword(password, loginUser.password)
    await generateJwtToken(res, nickname)
    return res.status(200).send({ success: true })
  }catch(err) {
    return res.status(404).send({ success: false, errorMessage: err.message })
  }
})

export default router
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { SECRETKEY } from '../app.js'


export const generateJwtToken = (res, nickname)=>{
  const token = jwt.sign({ nickname: nickname }, SECRETKEY)
  return  res.cookie('Authorization', `Bearer ${token}`)
}

export const comparePassword = (password,reqPassword) =>{
    if(!bcrypt.compare(password, reqPassword))
          return new Error('passwords do not match')
}

export const hashedPassword = async (password) => {
  return  await bcrypt.hash(password, 10)
}


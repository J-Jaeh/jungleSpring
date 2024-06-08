import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import {SECRETKEY} from '../app.js'


const auth= (req, res, next) => {
  const { Authorization } = req.cookies
  const [authType, authToken] = (Authorization ?? '').split(' ');

  if (!authToken || authType !== 'Bearer') {
    return res.status(401).json({
      success: false,
      errorMessage: '로그인 후 이용 가능한 기능입니다.',
    });
  }
  try {
    const { nickname } = jwt.verify(authToken,SECRETKEY);
    console.log('로그인 사용자 nickname', nickname);
    res.locals.nickname = nickname;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({
      success: false,
      errorMessage:
        '로그인 후 이용 가능한 기능입니다.(인증되지 못한 토큰임)',
    });
  }
}

export default auth;
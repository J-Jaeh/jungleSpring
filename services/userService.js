import { UserModel } from '../models/user.js'


const userModel = new UserModel


export class UserService {
  constructor() {
    this.userModel = userModel
  }

  async registerUser(user) {
    try {
      console.log('user password =',user.password)
      return this.userModel.registerUser(user)
    } catch (err) {
      return new Error(err.message)
    }
  }

  async loginUser(req) {
    const findUser = await this.userModel.findUser(req.nickname)
    if (!findUser) return new Error('Incorrect Username or Password, or Unregistered User')
    return findUser
  }
}
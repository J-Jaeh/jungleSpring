import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: [true, '닉네임은 필수로 입력해야합니다'],
    unique: true,
    minlength: [3, '닉네임은 최소 3자 이상이여야 합니다'],
    match: [/^[a-zA-Z0-9]+$/, '닉네임은 알파벳 대소문자(a~z, A~Z)와 숫자(0~9)로만 구성되어야 합니다.'],
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },
}, { timestamps: true })


const User = mongoose.model('user', userSchema)

export class UserModel {
  async registerUser(registerUser) {
    const user = new User(registerUser)
    return await user.save()
  }

  async findUser(nickname) {
    return User.findOne({ nickname: nickname }).exec()
  }
}

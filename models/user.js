import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  nickname:{
    type:String,
    required:[true,'닉네임은 필수로 입력해야합니다'],
    unique:true,
    minlength:[3,'닉네임은 최소 3자 이상이여야 합니다'],
    match:[/^[a-zA-Z0-9]+$/,'닉네임은 알파벳 대소문자(a~z, A~Z)와 숫자(0~9)로만 구성되어야 합니다.']},
  password:{
    type:String,
    required: true,
    minlength:4,
    validate:{
      validator: function(value){
        return !value.includes(this.nickname);
      },
      message : '비밀번호에는 닉네임을 포함할 수 없습니다.'
    }
  },
}, { timestamps: true });


export default mongoose.model('user', userSchema);
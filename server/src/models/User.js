import mongoose from 'mongoose'
import crypto from 'crypto'

const User = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// 모델 메소드 : 비밀번호 해싱 -> crypto sha256방식
function hash (password) {
  return crypto.createHmac(
    'sha256',
    process.env.SECRET_KEY
  ).update(password).digest('hex')
}

/*
  모델 메소드 방식 : statics, methods
    - statics: this -> 모델을 가리킴
      + CRUD 하는 메소드와 같이 모델 변수에서 전역으로 사용
    - methods: this -> 데이터의 인스턴스를 가리킴
      + document를 CRUD하여 나타낸 객체를 연산할 때 사용
*/
User.statics.findByUsername = function (username) {
  return this.findOne({ username }).exec()
}

User.statics.findByEmail = function (email) {
  return this.findOne({ email }).exec()
}

User.statics.findByEmailOrUsername = function ({ username, email }) {
  return this.findOne({
    $or: [
      { username },
      { email }
    ]
  }).exec()
}

User.statics.register = function ({ username, email, password }) {
  const user = new this({
    username,
    email,
    password: hash(password)
  })

  return user.save()
}

User.methods.validatePassword = function (password) {
  const result = hash(password)

  return this.password === result
}

export default mongoose.model('User', User)
import User from 'models/User'
import Joi from 'joi'

// 회원가입 (POST) API '/api/auth/register'
exports.register = async (ctx) => {
  // 데이터 검증
  const data = Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  })

  const result = Joi.validate(ctx.request.body, data)

  if (result.error) {
    // 400: 잘못된 요청
    ctx.status = 400
    return
  }

  // username, email 중복 검사
  let existing = null

  try {
    existing = await User.findByEmailOrUsername(ctx.request.body)
  } catch (err) {
    ctx.throw(err)
  }

  if (existing) {
    // 409: 충돌
    ctx.status = 409
    ctx.code = {
      key: existing.email === ctx.request.body.email ?
        'email' : 'username'
    }
    return
  }

  // 사용자 생성
  let user = null

  try {
    user = await User.register(ctx.request.body)
  } catch (err) {
    ctx.throw(err)
  }

  ctx.body = user
}

// 로그인 (POST) API '/api/auth/login'
exports.login = async (ctx) => {
  
}
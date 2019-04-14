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
  // 데이터 검증
  const data = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  })

  const result = Joi.validate(ctx.request.body, data)

  if (result.error) {
    // 400: 잘못된 요청
    ctx.status = 400
    return
  }

  // email, password를 리퀘스트에서 받아옴
  const { email, password } = ctx.request.body

  let user = null

  try {
    user = await User.findByEmail(email)
  } catch (err) {
    ctx.throw(500, err)
  }

  // 사용자 권한
  if (!user || !user.validatePassword(password)) {
    // 403: 권한없음
    ctx.status = 403
    return
  }

  // 토큰 생성 및 쿠키에 저장
  let token = null

  try {
    token = await user.generateToken()
  } catch (err) {
    ctx.throw(500, err)
  }

  ctx.cookies.set('access_token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7일
  })
  ctx.body = user
}

// 로그아웃 (POST) API '/api/auth/logout'
exports.logout = (ctx) => {
  ctx.cookies.set('access_token', null, {
    httpOnly: true,
    maxAge: 0
  })

  // 204: 컨텐츠 없음
  ctx.status = 204
}

// 현 접속자 확인 (GET) API '/api/auth/check'
exports.check = (ctx) => {
  const { user } = ctx.request

  if (!user) {
    ctx.body = '로그인 정보 없음'
    return
  }

  ctx.body = user
}
import jwt from 'jsonwebtoken'

/**
 * JWT 토큰 만들기
 * @param {any} payload
 * @returns {string} token
*/
function generateToken (payload) {
  return new Promise((resolve, reject) => {
    // jwt.sign(토큰에 들어갈 데이터, 비밀키, 옵션, 콜백함수)
    jwt.sign(payload, process.env.JWT_SECRET, {
      // 만료는 7일
      expiresIn: '7d'
    }, (error, token) => {
      if (error) reject(error)
      resolve(token)
    })
  })
}

// 토큰 해석 함수 (디코딩)
function decodeToken (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) reject(error)
      resolve(decoded)
    })
  })
}

/*
  미들웨어
    payload: 토큰에 담을 정보(클레임)
    - iss: 토큰 발급자
    - sub: 토큰 제목
    - aud: 토큰 대상자
    - exp: 토큰 만료 시간
    - nbf: Not Before 토큰의 활성날짜
    - iat: 토큰 발급 시간
    - jti: jwt 고유 식별자
*/
exports.jwtMiddleware = async (ctx, next) => {
  const token = ctx.cookies.get('login_token')

  if (!token) return next()

  try {
    const decoded = await decodeToken(token)

    // 토큰 만료일이 하루 남을 시 토큰 7일로 재 발급
    if (Date.now() / 1000 - decoded.iat > 60 * 60 * 24) {
      const { _id, email } = decoded
      const newToken = await generateToken({ _id, email }, 'User')

      ctx.cookies.set('login_token', newToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7
      })
    }

    ctx.request.user = decoded
  } catch (err) {
    ctx.request.user = null
  }

  return next()
}

exports.generateToken = generateToken
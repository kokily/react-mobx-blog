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

exports.generateToken = generateToken
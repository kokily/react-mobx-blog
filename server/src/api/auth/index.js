import Router from 'koa-router'

const auth = new Router()

auth.get('/', (ctx) => {
  ctx.body = '인증 루트'
})

export default auth
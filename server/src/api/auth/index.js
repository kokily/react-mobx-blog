import Router from 'koa-router'
import authCtrl from './auth.ctrl'

const auth = new Router()

auth.get('/', (ctx) => {
  ctx.body = '인증 루트'
})

auth.post('/register', authCtrl.register)
auth.post('/login', authCtrl.login)

export default auth
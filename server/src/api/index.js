import Router from 'koa-router'

// API
import auth from './auth'

const api = new Router()

api.get('/', (ctx) => {
  ctx.body = 'Rest API 분기점'
})

api.use('/auth', auth.routes())

export default api
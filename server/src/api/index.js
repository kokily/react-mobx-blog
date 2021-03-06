import Router from 'koa-router'

// API
import auth from './auth'
import post from './post'

const api = new Router()

api.get('/', (ctx) => {
  ctx.body = 'Rest API 분기점'
})

api.use('/auth', auth.routes())
api.use('/post', post.routes())

export default api
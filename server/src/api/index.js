import Router from 'koa-router'

const api = new Router()

api.get('/', (ctx) => {
  ctx.body = 'Rest API 분기점'
})

export default api
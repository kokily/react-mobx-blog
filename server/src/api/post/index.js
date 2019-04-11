import Router from 'koa-router'
import postCtrl from './post.ctrl'

const post = new Router()

post.get('/', (ctx) => {
  ctx.body = '포스트 API 분기점'
})

post.post('/write', postCtrl.write)
post.get('/list', postCtrl.list)

post.get('/:id', postCtrl.read)
post.put('/:id', postCtrl.update)
post.delete('/:id', postCtrl.remove)

export default post
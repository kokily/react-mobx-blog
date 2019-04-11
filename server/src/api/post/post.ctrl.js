import Post from 'models/Post'
import Joi from 'joi'

// 포스트 작성 (POST) API '/api/post/write'
exports.write = async (ctx) => {
  // Request Body(객체 값) 검증
  const data = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required()
  })

  const result = Joi.validate(ctx.request.body, data)

  if (result.error) {
    ctx.status = 400
    ctx.body = result.error
    return
  }

  // title, body를 리퀘스트에서 받아옴
  const { title, body } = ctx.request.body
  const author = ctx.request.user._id

  // 새로은 글 작성
  const post = new Post({
    title, body, author
  })

  try {
    await post.save()

    ctx.body = post
  } catch (err) {
    ctx.throw(500, err)
  }
}

// 포스트 글 리스트 (GET) API '/api/post/list'
exports.list = async (ctx) => {
  // 파라미터 값으로 페이지가 주어지지 않으면 page = 1
  const page = parseInt(ctx.params.page || 1, 5)

  if (page < 1) {
    // page 가 1보다 작을 시 에러 반환
    // 400: 잘못된 요청
    ctx.status = 400
    return
  }

  try {
    const postlist = await Post.find().sort({_id: -1}).limit(5).skip((page - 1) * 5).exec()
    const lastPage = await Post.countDocuments().exec

    ctx.set('last-page', Math.ceil(lastPage / 10))
    ctx.body = postlist
  } catch (err) {
    ctx.throw(500, err)
  }
}

// 포스트 특정(ID) 글 읽기 (GET) API '/api/post/:id'
exports.read = async (ctx) => {
  const { id } = ctx.params

  try {
    const post = await Post.findById(id).exec()

    if (!post) {
      ctx.status = 404
      return
    }

    ctx.body = post
  } catch (err) {
    ctx.throw(500, err)
  }
}

// 포스트 특정(ID) 글 수정하기 (PUT) API '/api/post/:id'
exports.update = async (ctx) => {
  const { id } = ctx.params

  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, { new: true }).exec()

    if (!post) {
      ctx.status = 404
      return
    }

    ctx.body = post
  } catch (err) {
    ctx.throw(500, err)
  }
}

// 포스트 특정(ID) 글 삭제하기 (DELETE) API '/api/post/:id'
exports.remove = async (ctx) => {
  const { id } = ctx.params

  try {
    await Post.findByIdAndRemove(id).exec()
    ctx.status = 204
  } catch (err) {
    ctx.throw(500, err)
  }
}
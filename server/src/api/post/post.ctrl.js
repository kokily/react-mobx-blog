import Post from 'models/Post'
import User from 'models/User'
import Joi from 'joi'
import { Types } from 'mongoose'

// 객체 검증 함수
exports.checkObjectId = (ctx, next) => {
  const { id } = ctx.params

  if (!Types.ObjectId.isValid(id)) {
    ctx.status = 400
    return null
  }

  return next()
}

// 포스트 작성 (POST) API '/api/post/write'
exports.write = async (ctx) => {
  // 사용자 로그인 상태 확인
  const { user } = ctx.request

  if (!user) {
    ctx.status = 403
    return
  }

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

  let currentUser = null

  try {
    currentUser = await User.findById(user).exec()
  } catch (err) {
    ctx.throw(500, err)
  }

  // title, body를 리퀘스트에서 받아옴
  const { title, body } = ctx.request.body
  const author = ctx.request.user
  const name = currentUser.username

  // 새로은 글 작성
  const post = new Post({
    title, body, author, name
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
  const { user } = ctx.request
  const { id } = ctx.params

  ctx.request.body.updatedAt = Date.now()

  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, { new: true }).exec()

    if (!post) {
      ctx.status = 404
      return
    }

    if (!user || user._id !== post.author.toString()) {
      ctx.status = 403
      return
    }

    ctx.body = post
  } catch (err) {
    ctx.throw(500, err)
  }
}

// 포스트 특정(ID) 글 삭제하기 (DELETE) API '/api/post/:id'
exports.remove = async (ctx) => {
  const { user } = ctx.request
  const { id } = ctx.params

  try {
    const post = await Post.findById(id).exec()

    if (!user || user._id !== post.author.toString()) {
      ctx.status = 403
      return
    }

    await Post.findByIdAndRemove(id).exec()
    ctx.status = 204
  } catch (err) {
    ctx.throw(500, err)
  }
}
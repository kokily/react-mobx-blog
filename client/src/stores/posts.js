import { observable, action } from 'mobx'
import axios from 'axios'

export default class PostsStore {
  constructor(root) {
    this.root = root
  }

  // 포스트 리스트
  @observable postList = []

  @action getPostList = async () => {
    await axios.get('/api/post/list')
      .then(res => {
        this.postList = res.data
      })
      .catch((err) => console.error(err))
  }

  // 포스트 작성
  @observable writeOpen = false
  @observable title = ''
  @observable body = ''

  @action toggleModal = () => {
    this.writeOpen = !this.writeOpen
  }

  @action changeTitle = (e) => {
    this.title = e.target.value
  }

  @action changeBody = (e) => {
    this.body = e.target.value
  }

  @action addPost = async () => {
    await axios.post('/api/post/write', {
      title: this.title,
      body: this.body
    })
      .then(res => {
        window.alert('포스트 저장 완료')
        this.title = ''
        this.body = ''
        this.toggleModal()
        this.getPostList()
      })
      .catch((err) => console.error(err))
  }

  // 특정 포스트 읽기
  @observable readOpen = false
  @observable postID = {}

  @action togglePost = () => {
    this.readOpen = !this.readOpen
  }
  
  @action openPost = async (id) => {
    await axios.get(`/api/post/${id}`)
      .then(res => {
        this.postID = res.data._id
        this.title = res.data.title
        this.body = res.data.body
        this.togglePost()
      })
      .catch((err) => {
        console.error(err)
      })
  }

  @action closePost = () => {
    this.postID = {}
    this.title = ''
    this.body = ''
    this.writeOpen = false
    this.readOpen = false
    this.getPostList()
  }

  // 포스트 수정
  @action updatePost = async () => {
    const id = this.postID
    await axios.put(`/api/post/${id}`, {
      title: this.title,
      body: this.body
    }).then(res => {
      window.alert('포스트 수정 완료')
      this.postID = {}
      this.title = ''
      this.body = ''
      this.togglePost()
      this.getPostList()
    })
    .catch((err) => {
      console.error(err)
    })
  }

  // 포스트 삭제
  @action removePost = async () => {
    window.confirm('정말 삭제하시나요?')
    const id = this.postID
    await axios.delete(`/api/post/${id}`)
      .then(res => {
        window.alert('포스트 삭제 완료')
        this.postID = {}
        this.title = ''
        this.body = ''
        this.togglePost()
        this.getPostList()
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
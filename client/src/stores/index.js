import HeaderStore from './header'
import AuthStore from './auth'
import PostsStore from './posts'

export default class RootStore {
  constructor() {
    this.header = new HeaderStore(this)
    this.auth = new AuthStore(this)
    this.posts = new PostsStore(this)
  }
}
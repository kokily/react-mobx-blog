import AuthStore from './auth'

class RootStore {
  constructor() {
    this.auth = new AuthStore(this)
  }
}

export default RootStore
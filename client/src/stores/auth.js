import { observable, action } from 'mobx'

export default class AuthStore {
  constructor(root) {
    this.root = root
  }

  @observable isLoggedIn = false
}
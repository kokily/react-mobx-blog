import { observable, action } from 'mobx'

export default class HeaderStore {
  constructor(root) {
    this.root = root
  }

  @observable menuOpen = false

  @action toggleMenu = () => {
    this.menuOpen = !this.menuOpen
  }
}
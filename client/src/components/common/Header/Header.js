import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import classNames from 'classnames/bind'
import styles from './Header.scss'

import Button from 'components/common/Button'

// MobX
import { inject, observer } from 'mobx-react'

const cx = classNames.bind(styles)

class Header extends Component {
  render() {
    return (
      <header className={cx('header')}>
        <div className={cx('content')}>
          <div className={cx('brand')}>
            <Link to="/">리액트 블로그</Link>
          </div>
      
          <div className={cx('menu')}>
            <Button theme="outline" to="/">포스트</Button>
            <Button theme="outline" to="/login">로그인</Button>
            <Button theme="outline" to="/register">회원가입</Button>
          </div>
        </div>
      </header>
    )
  }
}

export default Header
import React from 'react'
import { Link } from 'react-router-dom'

import classNames from 'classnames/bind'
import styles from './Footer.scss'

const cx = classNames.bind(styles)

function Footer() {
  return (
    <footer className={cx('footer')}>
      <div className={cx('brand')}>
        <Link to="/">리액트 블로그</Link>
      </div>
    </footer>
  )
}

export default Footer
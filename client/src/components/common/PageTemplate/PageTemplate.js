import React from 'react'

import classNames from 'classnames/bind'
import styles from './PageTemplate.scss'

import Header from 'components/common/Header'
import Footer from 'components/common/Footer'

const cx = classNames.bind(styles)

function PageTemplate(props) {
  return (
    <div className={cx('page-template')}>
      <Header />

      <main>
        { props.children }
      </main>

      <Footer />
    </div>
  )
}

export default PageTemplate
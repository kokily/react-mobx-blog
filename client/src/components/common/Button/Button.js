import React from 'react'
import { Link } from 'react-router-dom'

import classNames from 'classnames/bind'
import styles from './Button.scss'

const cx = classNames.bind(styles)
const Div = ({ children, ...rest }) => <div {...rest}>{ children }</div>

function Button(props) {
  const { children, to, onClick, disabled, theme = 'default' } = props
  const Ele = (to && !disabled) ? Link : Div

  return (
    <Ele
      to={to}
      className={cx('button', theme, { disabled })}
      onClick={disabled ? () => null : onClick}
    >
      { children }
    </Ele>
  )
}

export default Button
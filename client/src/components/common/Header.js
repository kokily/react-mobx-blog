import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// MobX
import { inject, observer } from 'mobx-react'

// ReactStrap
import { Navbar, NavbarBrand, NavbarToggler, Collapse,
  Nav, NavItem, NavLink,
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap'

// Style
import './scss/Header.scss'

@inject('header', 'auth')
@observer
class Header extends Component {
  render() {
    const { header, auth } = this.props
    
    return (
      <div className="header">
        <Navbar color="primary" dark expand="md">
          <NavbarBrand tag={Link} to="/">리액트 블로그</NavbarBrand>

          <NavbarToggler onClick={header.toggleMenu}/>
          <Collapse isOpen={header.menuOpen} navbar>
            <Nav className="ml-auto" color="white" navbar>
              <NavItem>
                <NavLink tag={Link} to="/">포스트</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  사용자 인증
                </DropdownToggle>

                <DropdownMenu right>
                  {auth.currentUser._id ?
                    <DropdownItem onClick={auth.handleLogout}>로그아웃</DropdownItem>
                    :
                    <DropdownItem tag={Link} to="/auth/login">로그인</DropdownItem>
                  }
                  <DropdownItem divider />
                  <DropdownItem tag={Link} to="/auth/register">회원가입</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

export default Header
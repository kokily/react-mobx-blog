import React, { Component } from 'react'

// MobX
import { inject, observer } from 'mobx-react'

// React Strap
import { Row, Col,
  Card, CardTitle, CardFooter, Button,
  Form, FormGroup, Label, Input
} from 'reactstrap'

@inject('auth')
@observer
class Auth extends Component {
  render() {
    const { mode, auth } = this.props

    const loginView = (
      <Card body>
        <CardTitle className="h4">로그인</CardTitle>
        <hr />
        <Form>
          <FormGroup row>
            <Label for="email" sm={3}>이메일</Label>
            <Col sm={9}>
              <Input type="email" id="email"
                value={auth.email} onChange={auth.changeEmail} autoFocus
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="password" sm={3}>비밀번호</Label>
            <Col sm={9}>
              <Input type="password" id="password"
                value={auth.password} onChange={auth.changePassword}
                onKeyPress={auth.keyPressLogin}
              />
            </Col>
          </FormGroup>
        </Form>
        <CardFooter>
          <Button block outline color="primary"
            onClick={auth.loginSubmit}
          >
            로그인
          </Button>
        </CardFooter>
      </Card>
    )
    
    const registerView = (
      <Card body>
        <CardTitle className="h4">회원가입</CardTitle>
        <hr />
        <Form>
          <FormGroup row>
            <Label for="emailReg" sm={3}>이메일</Label>
            <Col sm={9}>
              <Input type="email" id="emailReg"
                value={auth.emailReg} onChange={auth.changeEmailReg} autoFocus
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="usernameReg" sm={3}>이 름</Label>
            <Col sm={9}>
              <Input type="username" id="usernameReg"
                value={auth.usernameReg} onChange={auth.changeUsernameReg}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="passwordReg" sm={3}>비밀번호</Label>
            <Col sm={9}>
              <Input type="password" id="passwordReg"
                value={auth.passwordReg} onChange={auth.changePasswordReg}
                onKeyPress={auth.keyPressRegister}
              />
            </Col>
          </FormGroup>
        </Form>
        <CardFooter>
          <Button block outline color="primary"
            onClick={auth.registerSubmit}
          >
            회원가입
          </Button>
        </CardFooter>
      </Card>
    )

    return (
      <Row className="text-center" style={{ justifyContent: 'center' }}>
        <Col sm="4">
          {mode === 'login' ? loginView : registerView}
        </Col>
      </Row>
    )
  }
}

export default Auth
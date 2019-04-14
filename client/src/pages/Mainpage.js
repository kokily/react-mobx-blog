import React, { Component } from 'react'

// MobX
import { inject, observer } from 'mobx-react'

// Components
import { PageContainer } from 'components/common'
import { PostList } from 'components/posts'

// React Strap
import { Jumbotron, Container, Button,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Col, Input
} from 'reactstrap'

@inject('posts')
@observer
class Mainpage extends Component {
  render() {
    const { posts } = this.props

    return (
      <PageContainer>
        <Jumbotron fluid>
          <Container fluid className="text-center">
            <h4 className="display-5">리액트 블로그</h4>
          </Container>
        </Jumbotron>

        <PostList />

        <Container fluid className="text-right">
          <Button outline color="primary" onClick={posts.toggleModal}>글 작성</Button>
        </Container>

        <Modal isOpen={posts.writeOpen} toggle={posts.toggleModal} size="lg" keyboard={false}>
          <ModalHeader toggle={posts.toggleModal}>포스트 글 작성</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Label for="title" sm={2}>제목</Label>
                <Col sm={10}>
                  <Input type="text" id="title" value={posts.title} onChange={posts.changeTitle} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="body" sm={2}>내용</Label>
                <Col sm={10}>
                  <Input type="textarea" id="body" value={posts.body} onChange={posts.changeBody} />
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button outline color="primary" onClick={posts.addPost}>저 장</Button>
            <Button outline color="danger" onClick={posts.closePost}>취 소</Button>
          </ModalFooter>
        </Modal>
      </PageContainer>
    )
  }
}

export default Mainpage
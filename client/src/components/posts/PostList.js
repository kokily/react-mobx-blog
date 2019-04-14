import React, { Component } from 'react'

// MobX
import { inject, observer } from 'mobx-react'

// React Strap
import { Table, Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Col, Label, Input, Button
} from 'reactstrap'

// Moment
import Moment from 'react-moment'

// Style
import './scss/PostList.scss'

@inject('posts', 'auth')
@observer
class PostList extends Component {
  componentDidMount() {
    this.props.posts.getPostList()
  }

  render() {
    const { posts, auth } = this.props

    return (
      <>
        <Table hover className="text-center">
          <thead>
            <tr>
              <th>작성자</th>
              <th>제목</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {posts.postList.map(list => {
              return (
                <tr key={list._id}>
                  <td>{list.name}</td>
                  <td onClick={() => posts.openPost(list._id)} style={{ cursor: 'pointer' }}>
                    {list.title}
                  </td>
                  <td>
                    <Moment format="YYYY/MM/DD">
                      {list.createdAt}
                    </Moment>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        <hr />

        <div className="pagination">
          <Button
            color="success"
            outline
            disabled={posts.currentPage === 1}
            onClick={posts.prevPage}
          >
            이전 페이지
          </Button>
          <Button color="primary" disabled>{posts.currentPage}</Button>
          <Button
            color="success"
            outline
            disabled={posts.currentPage === parseInt(posts.lastPage)}
            onClick={posts.nextPage}
          >
            다음 페이지
          </Button>
        </div>

        <Modal isOpen={posts.readOpen} toggle={posts.togglePost} size="lg" keyboard={false}>
          <ModalHeader toggle={posts.togglePost}>글 세부보기</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Label for="title" sm={2}>제목</Label>
                <Col sm={10}>
                  <Input type="text" id="title" value={posts.title} onChange={posts.changeTitle}
                    disabled={auth.currentUser._id !== posts.postAuthor}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="body" sm={2}>내용</Label>
                <Col sm={10}>
                  <Input type="textarea" id="body" value={posts.body} onChange={posts.changeBody}
                    disabled={auth.currentUser._id !== posts.postAuthor}
                  />
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            {auth.currentUser._id !== posts.postAuthor ?
              '' :
              <>
                <Button color="success" onClick={posts.updatePost}>수 정</Button>
                <Button color="danger" onClick={posts.removePost}>삭 제</Button>
              </>
            }
            <Button color="warning" onClick={posts.closePost}>닫 기</Button>
          </ModalFooter>
        </Modal>
      </>
    )
  }
}

export default PostList
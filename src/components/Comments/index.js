import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    nameInput: '',
    commentInput: '',
    commentsList: [],
  }

  onChangeNameInput = event => {
    this.setState({
      nameInput: event.target.value,
    })
  }

  onChangeCommentInput = event => {
    this.setState({
      commentInput: event.target.value,
    })
  }

  onClickAddComment = event => {
    event.preventDefault()

    const {nameInput, commentInput} = this.state

    const initialBackgroundColorClassName =
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]

    const newComment = {
      id: uuidv4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  toggleIsLikedButton = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (eachComment.id === id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onDeleteComment = id => {
    const {commentsList} = this.state
    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== id),
    })
  }

  render() {
    const {nameInput, commentInput, commentsList} = this.state

    return (
      <div className="app-container">
        <div className="comments-container">
          <h1 className="comment-heading">Comments</h1>
          <div className="comment-inputs">
            <form className="form-container" onSubmit={this.onClickAddComment}>
              <p className="mini-heading">
                Say something about 4.0 Technologies
              </p>
              <input
                type="text"
                placeholder="Your Name"
                className="name-input"
                value={nameInput}
                onChange={this.onChangeNameInput}
              />
              <textarea
                rows="6"
                placeholder="Your Comment"
                className="comment-input"
                value={commentInput}
                onChange={this.onChangeCommentInput}
              />
              <button type="submit" className="add-button">
                Add Comment
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
            />
          </div>
          <hr className="horizontal-line" />
          <p className="count-comment-heading">
            <span className="span-element-count">{commentsList.length}</span>{' '}
            Comments
          </p>
          <ul className="comments-container">
            {commentsList.map(eachComment => (
              <CommentItem
                key={eachComment.id}
                commentDetails={eachComment}
                toggleIsLikedButton={this.toggleIsLikedButton}
                onDeleteComment={this.onDeleteComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments

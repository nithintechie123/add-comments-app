import {formatDistanceToNow} from 'date-fns'

import './index.css'

const CommentItem = props => {
  const {commentDetails, toggleIsLikedButton, onDeleteComment} = props
  const {id, name, comment, date, isLiked, initialClassName} = commentDetails

  const isLikedImage = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const isLikedButton = isLiked ? 'active-button' : 'button'
  const firstLetter = name[0]
  const postedTime = formatDistanceToNow(date)

  const onClickLikeButton = () => {
    toggleIsLikedButton(id)
  }

  const onClickDeleteIcon = () => {
    onDeleteComment(id)
  }

  return (
    <li className="comment-item">
      <div className="comment-container">
        <div className={`initial-container ${initialClassName}`}>
          <p className="first-letter">{firstLetter}</p>
        </div>
        <div>
          <div className="username-time-container">
            <p className="name">{name}</p>
            <p className="time">{postedTime}</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="buttons-container">
        <div className="like-container">
          <img src={isLikedImage} alt="like" className="like-image" />
          <button
            className={`like-button ${isLikedButton}`}
            type="button"
            onClick={onClickLikeButton}
          >
            Like
          </button>
        </div>
        <button
          className="delete-button"
          type="button"
          data-testid="delete"
          onClick={onClickDeleteIcon}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr className="horizontal-line" />
    </li>
  )
}

export default CommentItem

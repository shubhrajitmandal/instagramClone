import React, { useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import {
  BsHeart,
  BsHeartFill,
  BsChat,
  BsBookmark,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { FiShare } from "react-icons/fi";
import Default from "../../assets/images/default.png";
import PostContext from "../../context/post/postContext";

const Post = ({ post, user }) => {
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(post.likes.includes(user.Email));
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post.comments.slice(0, 3));

  const { likePost, dislikePost, postComment } = useContext(PostContext);
  const commentRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    postComment(post.id, comment, user);
    setComments([...comments, { username: user.Username, text: comment }]);
    setComment("");
  };

  const getPostUploadTime = () => {
    const sec = Math.floor((Date.now() - post.date) / 1000);
    let timeString;
    if (sec < 60) {
      return sec.toString() + " seconds ago";
    } else if (sec / 60 < 60) {
      timeString = Math.floor(sec / 60);
      return timeString.toString() + " minutes ago";
    } else if (sec / 3600 < 24) {
      timeString = Math.floor(sec / 3600);
      return timeString.toString() + " hours ago";
    } else if (sec / (3600 * 24) < 30) {
      timeString = Math.floor(sec / (3600 * 24));
      return timeString.toString() + " days ago";
    } else if (sec / (3600 * 24 * 30) > 1) {
      timeString = Math.floor(sec / (3600 * 24 * 30));
      return timeString.toString() + " months ago";
    } else if (sec / (3600 * 24 * 30 * 365) > 1) {
      timeString = Math.floor(sec / (3600 * 24 * 30 * 365));
      return timeString.toString() + " years ago";
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <Link
          to={
            post.username === user.Username
              ? "/dashboard/profile"
              : `/dashboard/profile/${post.username}`
          }
          className="post-user"
        >
          <img
            src={post.AvatarURL ? post.AvatarURL : Default}
            alt=""
            className="avatar"
          />
          {post.username}
        </Link>
        <span className="spacer" />
        <BsThreeDotsVertical className="post-options" />
      </div>

      <div className="img-container">
        <img src={post.imageURL} alt="postImage" className="post-image" />
      </div>

      <div>
        <div className="post-react">
          {liked ? (
            <BsHeartFill
              className="react-icon-liked"
              onClick={() => {
                dislikePost(post.id, user);
                setLiked(!liked);
                setLikes(likes.filter((email) => email !== user.Email));
              }}
            />
          ) : (
            <BsHeart
              className="react-icons"
              onClick={() => {
                likePost(post.id, user);
                setLikes([...likes, user.Email]);
                setLiked(!liked);
              }}
            />
          )}
          <BsChat
            className="react-icons"
            onClick={() => {
              commentRef.current.focus();
            }}
          />
          <FiShare className="react-icons" />
          <span className="spacer"></span>
          <BsBookmark className="react-icons" />
        </div>
        <h3 className="likes">{likes.length}likes</h3>
      </div>

      {post.caption && (
        <div className="caption">
          <div>
            <Link
              to={
                post.username === user.Username
                  ? "/dashboard/profile"
                  : `/dashboard/profile/${post.username}`
              }
              className="post-user"
            >
              {post.username}
            </Link>
            {post.caption}
          </div>
        </div>
      )}

      <div className="post-comment">
        <ul className="comment-area">
          {comments.map((comment, i) => (
            <li className="comment" key={i}>
              <div>
                <Link
                  to={
                    comment.username === user.Username
                      ? "/dashboard/profile"
                      : `/dashboard/profile/${comment.username}`
                  }
                  className="post-user"
                >
                  {comment.username}
                </Link>
                {comment.text}
              </div>
            </li>
          ))}
        </ul>

        <form className="comment-form" onSubmit={(e) => handleSubmit(e)}>
          <input
            className="comment-input"
            type="text"
            value={comment}
            ref={commentRef}
            placeholder="Add a comment..."
            onChange={(e) => setComment(e.target.value)}
          />
          <input
            type="submit"
            value="POST"
            className="comment-submit"
            onClick={(e) => handleSubmit(e)}
            disabled={comment ? false : true}
          />
        </form>
        <div className="timestamp">{getPostUploadTime()}</div>
      </div>
    </div>
  );
};

export default Post;

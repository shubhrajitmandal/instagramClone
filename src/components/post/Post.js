import React, { useState, useContext } from "react";
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
import { AuthContext } from "../../context/auth/AuthContext";

const Post = ({ post, user }) => {
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(post.likes.includes(user.Email));
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post.comments);

  const { likePost, dislikePost, postComment } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    postComment(post.id, comment);
    setComments([...comments, { username: user.Username, text: comment }]);
    setComment("");
  };

  const getPostUploadTime = () => {
    const sec = (Date.now() - post.date) / 1000;
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
    }
    return sec.toString();
  };

  return (
    <div className="post">
      <div className="post-header">
        <img
          src={post.avatarURL ? post.avatarURL : Default}
          alt=""
          className="avatar"
        />
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
                dislikePost(post.id);
                setLiked(!liked);
                setLikes(likes.filter((email) => email !== user.email));
              }}
            />
          ) : (
            <BsHeart
              className="react-icons"
              onClick={() => {
                likePost(post.id);
                setLikes([...likes, user.email]);
                setLiked(!liked);
              }}
            />
          )}
          <BsChat className="react-icons" />
          <FiShare className="react-icons" />
          <span className="spacer"></span>
          <BsBookmark className="react-icons" />
        </div>
        <h3 className="likes">{likes.length} likes</h3>
      </div>

      {post.caption && (
        <div className="caption">
          <div>
            <h4 className="post-user">{post.username}</h4> {post.caption}
          </div>
        </div>
      )}

      <div className="post-comment">
        <ul className="comment-area">
          {comments.map((comment, i) => (
            <li className="comment" key={i}>
              <div>
                <h4 className="post-user">{comment.username}</h4> {comment.text}
              </div>
            </li>
          ))}
        </ul>

        <form className="comment-form" onSubmit={(e) => handleSubmit(e)}>
          <input
            className="comment-input"
            type="text"
            value={comment}
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

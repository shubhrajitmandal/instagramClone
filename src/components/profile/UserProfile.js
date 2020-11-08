import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Default from "../../assets/images/default.png";
import { AuthContext } from "../../context/auth/AuthContext";
import Appbar from "../layout/Appbar";
import AppbarMenu from "../layout/AppbarMenu";
import Loader from "../layout/Loader";
import Spinner from "../layout/Spinner";
import { BsHeartFill, BsChatFill } from "react-icons/bs";

const UserProfile = () => {
  const { loading, user, updatePhoto, userPosts } = useContext(AuthContext);

  const changeAvatar = (file) => {
    updatePhoto(file);
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="dashboard">
      <Appbar />
      <Loader />
      <div className="profile-container">
        <div className="profile-desc">
          <div className="profile-avatar">
            <img src={user.AvatarURL ? user.AvatarURL : Default} alt="" />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => changeAvatar(e.target.files[0])}
            />
          </div>

          <div className="profile-info">
            <div className="profile-header">
              <h3 className="profile-name">{user.Username}</h3>
              <Link to="/dashboard/profile/edit" className="profile-edit">
                Edit Profile
              </Link>
            </div>

            <ul className="profile-stats">
              <li>
                <strong>{user.Posts.length}</strong> posts
              </li>
              <li>
                <strong>{user.Followers.length}</strong> followers
              </li>
              <li>
                <strong>{user.Following.length}</strong> following
              </li>
            </ul>

            <div className="profile-bio">
              <h3>{user.Name}</h3>
              {user.Bio && <p>{user.Bio}</p>}
            </div>
          </div>
        </div>

        <div className="profile-gallery">
          {userPosts.map((post, index) => (
            <div className="gallery-item" key={index}>
              <div className="gallery-hover">
                <BsHeartFill /> {post.likes.length}
                <BsChatFill />
                {post.comments.length}
              </div>
              <Link to={`/dashboard/${post.id}`}>
                <img src={post.imageURL} alt="" />
              </Link>
            </div>
          ))}
        </div>
      </div>
      {/* <AppbarMenu /> */}
    </div>
  );
};

export default UserProfile;

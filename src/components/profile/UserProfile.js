import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Default from "../../assets/images/default.png";
import AuthContext from "../../context/auth/authContext2";
import Appbar from "../layout/Appbar";
import ProgressBar from "../layout/ProgressBar";
import Spinner from "../layout/Spinner";
import { BsHeartFill, BsChatFill } from "react-icons/bs";

const UserProfile = () => {
  const { loading, userProfile, updateProfilePicture, userPosts } = useContext(
    AuthContext
  );

  const [percentage, setPercentage] = useState(0);

  const changeAvatar = (file) => {
    updateProfilePicture(file, setPercentage);
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="dashboard">
      <Appbar />
      <ProgressBar percentage={percentage} />
      <div className="profile-container">
        <div className="profile-desc">
          <div className="profile-avatar">
            <img
              src={userProfile.AvatarURL ? userProfile.AvatarURL : Default}
              alt=""
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => changeAvatar(e.target.files[0])}
            />
          </div>

          <div className="profile-info">
            <div className="profile-header">
              <h3 className="profile-name">{userProfile.Username}</h3>
              <Link to="/dashboard/profile/edit" className="profile-edit">
                Edit Profile
              </Link>
            </div>

            <ul className="profile-stats">
              <li>
                <strong>{userPosts.length}</strong> posts
              </li>
              <li>
                <strong>{userProfile.Followers.length}</strong> followers
              </li>
              <li>
                <strong>{userProfile.Following.length}</strong> following
              </li>
            </ul>

            <div className="profile-bio">
              <h3>{userProfile.Name}</h3>
              {userProfile.Bio && <p>{userProfile.Bio}</p>}
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

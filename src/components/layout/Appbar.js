import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
import { CgAddR } from "react-icons/cg";
import { AiFillHome } from "react-icons/ai";
import Search from "./Search";
import AppLogo from "../../assets/images/Instagram_logo2.svg";
import DefaultProfile from "../../assets/images/default.png";
import AuthContext from "../../context/auth/authContext2";
import PostContext from "../../context/post/postContext";

const Appbar = () => {
  const { logout, userProfile } = useContext(AuthContext);
  const { clearPosts } = useContext(PostContext);
  const history = useHistory();

  const handleLogout = () => {
    logout();
    clearPosts();
    history.push("/dashboard");
  };

  return (
    <div className="appbar-container">
      <div className="appbar">
        <img src={AppLogo} alt="logo" className="appbar-logo" />
        <Search />
        <div className="appbar-menu">
          <Link to="/dashboard">
            <AiFillHome className="appbar-icon" />
          </Link>
          <Link to="/dashboard/post">
            <CgAddR className="appbar-icon" />
          </Link>
          <Link to="/dashboard/profile">
            <img
              src={
                userProfile.AvatarURL ? userProfile.AvatarURL : DefaultProfile
              }
              // src={DefaultProfile}
              alt=""
              className="user-avatar"
            />
          </Link>
          <BiLogOutCircle className="appbar-icon" onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
};

export default Appbar;

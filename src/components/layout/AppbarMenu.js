import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { BiSearch, BiLogOutCircle } from "react-icons/bi";
import { CgAddR } from "react-icons/cg";
import { AiFillHome } from "react-icons/ai";
import Search from "./Search";
import AppLogo from "../../assets/images/Instagram_logo2.svg";
import DefaultProfile from "../../assets/images/default.png";
import { AuthContext } from "../../context/auth/AuthContext";

const AppbarMenu = () => {
  const { logout, user } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push("/dashboard");
  };

  return (
    <div className="appbar-bottom">
      <Link to="/dashboard">
        <AiFillHome className="appbar-menu-icon" />
      </Link>
      <Link>
        <BiSearch className="appbar-menu-icon" />
      </Link>
      <Link to="/dashboard/post">
        <CgAddR className="appbar-menu-icon" />
      </Link>
      <Link to="/dashboard/profile">
        <img
          src={user.AvatarURL ? user.AvatarURL : DefaultProfile}
          // src={DefaultProfile}
          alt=""
          className="user-avatar"
          height="24px"
        />
      </Link>
      <BiLogOutCircle className="appbar-menu-icon" onClick={handleLogout} />
    </div>
  );
};

export default AppbarMenu;

import React, { useContext, useState, useEffect } from "react";
import DefaultProfile from "../../assets/images/default.png";
import { AuthContext } from "../../context/auth/AuthContext";
import Appbar from "../layout/Appbar";
import Spinner from "../layout/Spinner";

const EditProfileForm = (props) => {
  const { loading, user, editProfile } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.Name);
      setUsername(user.Username);
      setEmail(user.Email);
      if (user.Bio) setBio(user.Bio);
      if (user.Gender) setGender(user.Gender);
      if (user.Phone) setPhone(user.Phone);
    }
  }, [loading, user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    editProfile(name, username, email, bio, gender, phone);

    props.history.push("/dashboard/profile");
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="dashboard">
      <Appbar />

      <div className="edit-container">
        <ul className="edit-sidebar">
          <li className="active">Edit Profile</li>
          <li>Change Password</li>
          <li>Privacy & Security</li>
        </ul>

        <div className="edit-form">
          <div className="form-group">
            <img
              src={user.AvatarURL ? user.AvatarURL : DefaultProfile}
              alt=""
              className="edit-avatar"
            />
            <div className="edit-header">
              {user.Username}
              {/* <label>Change Profile Photo</label>
              <input type="file" accept="image/*" /> */}
            </div>
          </div>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Bio</label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group edit-hide">
            <label>Gender</label>
            <input
              type="text"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="submit">
            <input
              type="submit"
              value="Save"
              onClick={(e) => handleSubmit(e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileForm;

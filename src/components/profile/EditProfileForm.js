import React, { useContext, useState, useEffect } from "react";
import DefaultProfile from "../../assets/images/default.png";
import AuthContext from "../../context/auth/authContext2";
import Appbar from "../layout/Appbar";
import Spinner from "../layout/Spinner";

const EditProfileForm = () => {
  const { loading, userProfile, editProfile } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.Name);
      setUsername(userProfile.Username);
      setEmail(userProfile.Email);
      if (userProfile.Bio) setBio(userProfile.Bio);
      if (userProfile.Gender) setGender(userProfile.Gender);
      if (userProfile.Phone) setPhone(userProfile.Phone);
    }
  }, [loading, userProfile]);

  const handleSubmit = (e) => {
    e.preventDefault();

    editProfile(name, username, email, bio, gender, phone);
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="dashboard">
      <Appbar />

      <div className="edit-container">
        <ul className="edit-sidebar">
          <li className="active">Edit Profile</li>
          {/* <li>Change Password</li>
          <li>Privacy & Security</li> */}
        </ul>

        <div className="edit-form">
          <div className="form-group">
            <img
              src={
                userProfile.AvatarURL ? userProfile.AvatarURL : DefaultProfile
              }
              alt=""
              className="edit-avatar"
            />
            <div className="edit-header">{userProfile.Username}</div>
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

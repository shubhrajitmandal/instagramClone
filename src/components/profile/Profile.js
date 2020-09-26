import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Default from "../../assets/images/default.png";
import { AuthContext } from "../../context/auth/AuthContext";
import Appbar from "../layout/Appbar";
import Spinner from "../layout/Spinner";
import { firebase, Firestore } from "../../firebase/config";

const Profile = (props) => {
  const [profile, setProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  let { username } = useParams();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    Firestore.collection("Users")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          const profile = doc.data();
          if (profile.Username === username) {
            setProfile(profile);
            const user = localStorage.getItem("current-user");
            setIsFollowing(profile.Followers.includes(user));
            Firestore.collection("Posts")
              .get()
              .then((snap) => {
                const userPosts = [];
                snap.forEach((doc) => {
                  if (profile.Posts.includes(doc.id)) {
                    userPosts.push(doc.data());
                  }
                });
                setUserPosts(userPosts);
                setLoading(false);
              })
              .catch((err) => console.log(err));
          }
        });
      });

    //eslint-disable-next-line
  }, [isFollowing]);

  // USE TRANSACTIONS
  const followUser = () => {
    Firestore.collection("Users")
      .doc(profile.Email)
      .update({
        Followers: firebase.firestore.FieldValue.arrayUnion(user.Email),
      })
      .then(setIsFollowing(!isFollowing));
    Firestore.collection("Users")
      .doc(user.Email)
      .update({
        Following: firebase.firestore.FieldValue.arrayUnion(profile.Email),
      });
  };

  const unfollowUser = () => {
    Firestore.collection("Users")
      .doc(profile.Email)
      .update({
        Followers: firebase.firestore.FieldValue.arrayRemove(user.Email),
      })
      .then(setIsFollowing(!isFollowing));
    Firestore.collection("Users")
      .doc(user.Email)
      .update({
        Following: firebase.firestore.FieldValue.arrayRemove(profile.Email),
      });
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="dashboard">
      <Appbar />
      <div className="profile-container">
        <div className="profile-desc">
          <div className="profile-avatar">
            <img src={profile.AvatarURL ? profile.AvatarURL : Default} alt="" />
          </div>

          <div className="profile-info">
            <div className="profile-header">
              <h3 className="profile-name">{profile.Username}</h3>
              {isFollowing ? (
                <button className="profile-unfollow" onClick={unfollowUser}>
                  Following
                </button>
              ) : (
                <button className="profile-follow" onClick={followUser}>
                  Follow
                </button>
              )}
            </div>

            <ul className="profile-stats">
              <li>
                <strong>{profile.Posts.length}</strong> posts
              </li>
              <li>
                <strong>{profile.Followers.length}</strong> followers
              </li>
              <li>
                <strong>{profile.Following.length}</strong> following
              </li>
            </ul>

            <div className="profile-bio">
              <h3>{profile.Name}</h3>
              {profile.Bio && <p>{profile.Bio}</p>}
            </div>
          </div>
        </div>

        <div className="profile-gallery">
          {userPosts.map((post, index) => (
            <div className="gallery-item" key={index}>
              <img src={post.imageURL} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
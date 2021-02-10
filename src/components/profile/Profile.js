import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Default from "../../assets/images/default.png";
import Appbar from "../layout/Appbar";
import Spinner from "../layout/Spinner";
import { BsHeartFill, BsChatFill } from "react-icons/bs";
import { firebase, Firestore } from "../../firebase/config";
import AuthContext from "../../context/auth/authContext2";

const Profile = (props) => {
  const [profile, setProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  let { username } = useParams();

  const { userProfile } = useContext(AuthContext);

  useEffect(() => {
    Firestore.collection("Users")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          const profile = doc.data();
          if (profile.Username === username) {
            setProfile(profile);
            setIsFollowing(profile.Followers.includes(userProfile.Email));
            Firestore.collection("Posts")
              .get()
              .then((snap) => {
                const userPosts = [];
                snap.forEach((doc) => {
                  if (profile.Posts.includes(doc.id)) {
                    userPosts.push({ id: doc.id, ...doc.data() });
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
        Followers: firebase.firestore.FieldValue.arrayUnion(userProfile.Email),
      })
      .then(setIsFollowing(!isFollowing));
    Firestore.collection("Users")
      .doc(userProfile.Email)
      .update({
        Following: firebase.firestore.FieldValue.arrayUnion(profile.Email),
      });
  };

  const unfollowUser = () => {
    Firestore.collection("Users")
      .doc(profile.Email)
      .update({
        Followers: firebase.firestore.FieldValue.arrayRemove(userProfile.Email),
      })
      .then(setIsFollowing(!isFollowing));
    Firestore.collection("Users")
      .doc(userProfile.Email)
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

export default Profile;

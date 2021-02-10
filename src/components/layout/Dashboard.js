import React, { useContext } from "react";
import Appbar from "./Appbar";
import AuthContext from "../../context/auth/authContext2";
import PostContext from "../../context/post/postContext";
import Post from "../post/Post";
import Spinner from "./Spinner";

const Dashboard = () => {
  const { userProfile, loading } = useContext(AuthContext);
  const { posts } = useContext(PostContext);

  return loading ? (
    <Spinner />
  ) : (
    <div className="dashboard">
      <Appbar />
      <div className="container">
        {posts.map((post) => (
          <Post post={post} key={post.id} user={userProfile} />
        ))}
      </div>
      {/* <AppbarMenu /> */}
    </div>
  );
};

export default Dashboard;

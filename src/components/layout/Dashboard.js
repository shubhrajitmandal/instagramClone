import React, { useContext } from "react";
import Appbar from "./Appbar";
import { AuthContext } from "../../context/auth/AuthContext";
import Post from "../post/Post";
import Spinner from "./Spinner";

const Dashboard = () => {
  const { user, loading, posts } = useContext(AuthContext);

  return loading ? (
    <Spinner />
  ) : (
    <div className="dashboard">
      <Appbar />
      <div className="container">
        {posts.map((post) => (
          <Post post={post} key={post.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

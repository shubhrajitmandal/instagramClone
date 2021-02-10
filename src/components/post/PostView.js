import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Appbar from "../layout/Appbar";
import AuthContext from "../../context/auth/authContext2";
import PostContext from "../../context/post/postContext";
import Post from "../post/Post";
import Spinner from "../layout/Spinner";

const PostView = () => {
  const [post, setPost] = useState({});
  const [loading2, setLoading2] = useState(true);
  const { userProfile, loading } = useContext(AuthContext);
  const { getPostByID } = useContext(PostContext);
  let { postId } = useParams();

  useEffect(() => {
    getPostByID(postId, setPost, setLoading2);
    //eslint-disable-next-line
  }, [loading, postId]);

  return loading || loading2 ? (
    <Spinner />
  ) : (
    <div className="dashboard">
      <Appbar />
      <div className="container">
        <Post post={post} user={userProfile} />
      </div>
      {/* <AppbarMenu /> */}
    </div>
  );
};

export default PostView;

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Appbar from "../layout/Appbar";
import AppbarMenu from "../layout/AppbarMenu";
import { AuthContext } from "../../context/auth/AuthContext";
import Post from "../post/Post";
import Spinner from "../layout/Spinner";
import { Firestore } from "../../firebase/config";

const PostView = () => {
  const [post, setPost] = useState({});
  const [loading2, setLoading2] = useState(true);
  const { user, loading } = useContext(AuthContext);
  let { postId } = useParams();

  useEffect(() => {
    Firestore.collection("Posts")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          if (doc.id === postId) {
            setPost({ id: doc.id, ...doc.data() });
            setLoading2(false);
          }
        });
      });
  }, [loading, postId]);

  return loading || loading2 ? (
    <Spinner />
  ) : (
    <div className="dashboard">
      <Appbar />
      <div className="container">
        <Post post={post} user={user} />
      </div>
      {/* <AppbarMenu /> */}
    </div>
  );
};

export default PostView;

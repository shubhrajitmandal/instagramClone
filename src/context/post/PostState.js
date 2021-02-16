import React, { useEffect, useReducer, useContext } from "react";
import { useHistory } from "react-router-dom";
import { firebase, Firestore, Storage } from "../../firebase/config";
import PostContext from "./postContext";
import PostReducer from "./postReducer";

import AuthContext from "../auth/authContext2";

import { GET_POSTS, CLEAR_POSTS } from "./types";

const PostState = (props) => {
  const initialState = {
    posts: [],
  };

  let history = useHistory();
  const { user, userProfile } = useContext(AuthContext);

  useEffect(() => {
    Firestore.collection("Posts")
      .orderBy("date", "desc")
      .limit(30)
      .get()
      .then((snap) => {
        const posts = [];
        snap.forEach((doc) => {
          const post = doc.data();
          const id = doc.id;
          Firestore.collection("Users")
            .doc(post.email)
            .get()
            .then((doc) => {
              const user = doc.data();
              posts.push({ ...post, AvatarURL: user.AvatarURL, id });
            })
            .catch((err) => console.log(err.message));
        });
        dispatch({
          type: GET_POSTS,
          payload: posts,
        });
      });
  }, []);

  const [state, dispatch] = useReducer(PostReducer, initialState);

  const getPostByID = (postId, setPost, setLoading2) => {
    Firestore.collection("Posts")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          if (doc.id === postId) {
            const post = doc.data();
            post.id = doc.id;
            Firestore.collection("Users")
              .doc(post.email)
              .get()
              .then((doc) => {
                const user = doc.data();
                post.AvatarURL = user.AvatarURL;
                setPost(post);
                setLoading2(false);
              })
              .catch((err) => console.log(err.message));
          }
        });
      });
  };

  const uploadPost = async (file, caption, setPercentage) => {
    const StorageRef = Storage.ref(user.email + "/posts/" + file.name);
    StorageRef.put(file).on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setPercentage(percentage);
      },
      (err) => console.log(err),
      async () => {
        const url = await StorageRef.getDownloadURL();
        const post = {
          email: userProfile.Email,
          username: userProfile.Username,
          imageURL: url,
          caption: caption,
          likes: [],
          comments: [],
          date: Date.now(),
        };
        const res = await Firestore.collection("Posts").add(post);
        await Firestore.collection("Users")
          .doc(user.email)
          .set(
            {
              Posts: firebase.firestore.FieldValue.arrayUnion(res.id),
            },
            { merge: true }
          );
        setPercentage(0);
        history.push("/dashboard");
      }
    );
  };

  const likePost = (postID, user) => {
    console.log(postID, user);
    Firestore.collection("Posts")
      .doc(postID)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(user.Email),
      })
      .then()
      .catch((err) => console.log(err));
  };

  const dislikePost = (postID, user) => {
    Firestore.collection("Posts")
      .doc(postID)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(user.Email),
      })
      .then()
      .catch((err) => console.log(err));
  };

  const postComment = (postID, comment, user) => {
    const commentObj = {
      username: user.Username,
      text: comment,
    };
    Firestore.collection("Posts")
      .doc(postID)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion(commentObj),
      })
      .then()
      .catch((err) => console.log(err));
  };

  const clearPosts = () => dispatch({ type: CLEAR_POSTS });

  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        likePost,
        dislikePost,
        postComment,
        getPostByID,
        uploadPost,
        clearPosts,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;

import React, { useState, useEffect } from "react";
import { firebase, Auth, Firestore, Storage } from "../../firebase/config";

const AuthContext = React.createContext();

const AuthState = ({ children }) => {
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    Auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        localStorage.setItem("current-user", user.email);

        Firestore.collection("Users")
          .doc(user.email)
          .get()
          .then((doc) => {
            if (doc.exists) {
              const profile = doc.data();
              setUserProfile(profile);
              Firestore.collection("Posts")
                .get()
                .then((snap) => {
                  const userPosts = [];
                  snap.forEach((doc) => {
                    if (profile.Posts.includes(doc.id)) {
                      userPosts.push({ ...doc.data(), id: doc.id });
                    }
                  });
                  setUserPosts(userPosts);
                  setLoading(false);
                });
            } else {
              setLoading(true);
              const data = {
                AvatarURL: "",
                Name: user.displayName,
                Username: user.email.split("@")[0],
                Email: user.email,
                Posts: [],
                Followers: [],
                Following: [],
              };
              Firestore.collection("Users")
                .doc(user.email)
                .set(data)
                .then(
                  console.log("User Instance Created!"),
                  setUserProfile(data),
                  setLoading(false)
                )
                .catch((err) => console.log(err.message));
            }
          })
          .catch((err) => console.log(err));

        Firestore.collection("Posts")
          .orderBy("date", "desc")
          .get()
          .then((snap) => {
            const posts = [];
            snap.forEach((doc) => {
              posts.push({ ...doc.data(), id: doc.id });
            });
            setPosts(posts);
          });
      } else {
        setAlert(null);
        setUser(null);
        setPosts([]);
        setUserProfile(null);
        localStorage.removeItem("auth-token");
        localStorage.removeItem("current-user");
      }
    });

    //eslint-disable-next-line
  }, [loading]);

  const logout = () => {
    Auth.signOut()
      .then(localStorage.removeItem("auth-token"), setLoading(true))
      .catch((err) => console.log(err));
  };

  const editProfile = async (name, username, email, bio, gender, phone) => {
    setLoading(true);
    try {
      await Firestore.collection("Users").doc(user.email).update({
        Name: name,
        Username: username,
        Email: email,
        Bio: bio,
        Gender: gender,
        Phone: phone,
      });
      setLoading(false);
      console.log("Document Updated Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const updatePhoto = async (file) => {
    const StorageRef = Storage.ref(user.uid + "/profile/" + file.name);
    StorageRef.put(file).on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
        console.log(percentage);
      },
      (err) => console.log(err),
      async () => {
        const url = await StorageRef.getDownloadURL();
        await Firestore.collection("Users").doc(user.email).update({
          AvatarURL: url,
        });
        setLoading(true);
        setProgress(0);
      }
    );
  };

  const uploadPost = async (file, caption, history) => {
    const StorageRef = Storage.ref(user.uid + "/posts/" + file.name);
    StorageRef.put(file).on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
        console.log(percentage);
      },
      (err) => console.log(err),
      async () => {
        const url = await StorageRef.getDownloadURL();
        const post = {
          avatarURL: userProfile.AvatarURL,
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
        setLoading(true);
        history.push("/dashboard");
        setProgress(0);
      }
    );
  };

  const getProfile = async (username) => {
    const docs = [];
    const snap = await Firestore.collection("Users")
      .where("Username", "==", username)
      .get();
    await snap.forEach((doc) => {
      docs.push(doc.data());
    });
  };

  const likePost = (postID) => {
    Firestore.collection("Posts")
      .doc(postID)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(user.email),
      })
      .then()
      .catch((err) => console.log(err));
  };

  const dislikePost = (postID) => {
    Firestore.collection("Posts")
      .doc(postID)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(user.email),
      })
      .then()
      .catch((err) => console.log(err));
  };

  const postComment = (postID, comment, setComments) => {
    const commentObj = {
      username: userProfile.Username,
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

  return (
    <AuthContext.Provider
      value={{
        alert,
        user: userProfile,
        posts,
        userPosts,
        loading,
        progress,
        setAlert,
        setLoading,
        setProgress,
        logout,
        editProfile,
        updatePhoto,
        uploadPost,
        getProfile,
        likePost,
        dislikePost,
        postComment,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthState };

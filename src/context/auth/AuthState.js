import React, { useEffect, useReducer, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  Auth,
  Firestore,
  GoogleProvider,
  Storage,
} from "../../firebase/config";
import AuthContext from "./authContext2";
import AuthReducer from "./authReducer";
import AlertContext from "../../context/alert/alertContext";

import { GET_USER_SUCCESS, LOGOUT_SUCCESS, SET_LOADING_TRUE } from "./types";

const AuthState = ({ children }) => {
  const initialState = {
    user: {},
    userProfile: {},
    userPosts: [],
    loading: true,
  };

  let history = useHistory();
  const [updateContext, setUpdateContext] = useState(false);
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const { setAlert } = useContext(AlertContext);

  const { user } = state;

  useEffect(() => {
    Auth.onAuthStateChanged((user) => {
      if (user) {
        getUser(user);
      } else {
        dispatch({ type: LOGOUT_SUCCESS });
      }
    });
    setUpdateContext(false);

    // Fetch User Data
    const getUser = (user) => {
      Firestore.collection("Users")
        .doc(user.email)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const profile = doc.data();
            getUserPosts(user, profile);
            localStorage.setItem("auth-user", doc.data());
          } else {
            const profile = {
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
              .set(profile)
              .then(getUserPosts(user, profile))
              .catch((err) => console.log(err.message));
          }
        })
        .catch((err) => console.log(err.message));
    };

    // Fetch User Posts
    const getUserPosts = (user, profile) => {
      Firestore.collection("Posts")
        .get()
        .then((snap) => {
          const userPosts = [];
          snap.forEach((doc) => {
            if (profile.Posts.includes(doc.id)) {
              userPosts.push({ ...doc.data(), id: doc.id });
            }
          });
          dispatch({
            type: GET_USER_SUCCESS,
            user: user,
            userProfile: profile,
            userPosts: userPosts,
          });
        });
    };
  }, [updateContext]);

  const googleAuth = (setLoading) => {
    setAlert("");
    Auth.signInWithPopup(GoogleProvider)
      .then((res) => {
        localStorage.setItem("auth-token", res.user.getIdToken());
        history.push("/dashboard");
      })
      .catch((err) => {
        setLoading(false);
        setAlert(err.message);
      });
  };

  const loginWithEmail = (email, password, setLoading) => {
    setAlert("");
    Auth.signInWithEmailAndPassword(email, password)
      .then((res) => {
        localStorage.setItem("auth-token", res.user.getIdToken());
        history.push("/dashboard");
      })
      .catch((err) => {
        setLoading(false);
        setAlert(err.message);
      });
  };

  const createUserWithEmailAndPassword = (
    email,
    password,
    name,
    username,
    setLoading
  ) => {
    setAlert("");
    Auth.createUserWithEmailAndPassword(email, password)
      .then((res) => {
        res.user.updateProfile({
          displayName: username,
        });
        localStorage.setItem("auth-token", res.user.getIdToken());

        Firestore.collection("Users")
          .doc(res.user.email)
          .set({
            AvatarURL: "",
            Name: name,
            Username: username,
            Email: email,
            Posts: [],
            Followers: [],
            Following: [],
          })
          .then(history.push("/dashboard"))
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        setLoading(false);
        setAlert(err.message);
      });
  };

  const logout = () => {
    Auth.signOut()
      .then(
        dispatch({
          type: LOGOUT_SUCCESS,
        })
      )
      .catch((err) => console.log(err));
  };

  const updateProfilePicture = (file, setPercentage) => {
    const StorageRef = Storage.ref(user.email + "/profile/" + file.name);
    StorageRef.put(file).on(
      "state_changed",
      (snap) => {
        let progress = (snap.bytesTransferred / snap.totalBytes) * 100;
        setPercentage(progress);
        // dispatch({
        //   type: SET_PROGRESS,
        //   payload: percentage,
        // });
      },
      (err) => console.log(err),
      async () => {
        const url = await StorageRef.getDownloadURL();
        await Firestore.collection("Users").doc(user.email).update({
          AvatarURL: url,
        });
        setUpdateContext(true);
        setPercentage(0);
        // dispatch({
        //   type: UPLOAD_COMPLETED,
        // });
      }
    );
  };

  const editProfile = async (name, username, email, bio, gender, phone) => {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    history.push("/dashboard/profile");
    try {
      await Firestore.collection("Users").doc(user.email).update({
        Name: name,
        Username: username,
        Email: email,
        Bio: bio,
        Gender: gender,
        Phone: phone,
      });
      setUpdateContext(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        userProfile: state.userProfile,
        userPosts: state.userPosts,
        loading: state.loading,

        logout,
        googleAuth,
        loginWithEmail,
        createUserWithEmailAndPassword,
        updateProfilePicture,
        editProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;

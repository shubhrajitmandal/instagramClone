import React, { useEffect, useState, useContext } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { Firestore } from "../../firebase/config";
import Default from "../../assets/images/default2.png";
import AuthContext from "../../context/auth/authContext2";

const Search = () => {
  const [query, setQuery] = useState("");
  const [queryRes, setQueryRes] = useState(null);

  const { userProfile } = useContext(AuthContext);

  useEffect(() => {
    if (query) {
      Firestore.collection("Users")
        .get()
        .then((snap) => {
          const Users = [];
          snap.forEach((doc) => {
            const user = doc.data();
            if (user.Username.includes(query)) Users.push(user);
          });
          setQueryRes(Users);
        });
    } else {
      setQueryRes(null);
    }
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    Firestore.collection("Users")
      .get()
      .then((snap) => {
        const Users = [];
        snap.forEach((doc) => {
          const user = doc.data();
          if (user.Username.includes(query)) Users.push(user);
        });
        setQueryRes(Users);
      });
  };

  return (
    <div className="search-container">
      <form className="search" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        {query && (
          <IoMdCloseCircle
            className="search-close"
            onClick={() => {
              setQuery("");
              setQueryRes(null);
            }}
          />
        )}
      </form>
      {queryRes && (
        <ul className="search-result">
          {queryRes.map((user) => (
            <Link
              to={
                userProfile.Email === user.Email
                  ? "/dashboard/profile"
                  : `/dashboard/profile/${user.Username}`
              }
              key={user.Email}
              className="search-result-items"
              onClick={() => {
                setQuery("");
                setQueryRes(null);
              }}
            >
              <div>
                <img
                  src={user.AvatarURL ? user.AvatarURL : Default}
                  alt=""
                  className="search-avatar"
                />
              </div>
              <div className="search-info">
                <h3>{user.Username}</h3>
                <p>{user.Name}</p>
              </div>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;

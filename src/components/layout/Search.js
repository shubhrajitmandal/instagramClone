import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { Firestore } from "../../firebase/config";
import Default from "../../assets/images/default2.png";
// import Spinner from "../../assets/images/spinner3.gif";

const Search = () => {
  const [query, setQuery] = useState("");
  // const [loading, setLoading] = useState(false);
  const [queryRes, setQueryRes] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // setLoading(true);
    Firestore.collection("Users")
      .get()
      .then((snap) => {
        const Users = [];
        snap.forEach((doc) => {
          const user = doc.data();
          if (user.Username.includes(query)) Users.push(user);
        });
        console.log(Users);
        setQueryRes(Users);
        // setLoading(false);
      });
  };

  return (
    <div className="search-container">
      <form className="search" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
                localStorage.getItem("current-user") === user.Email
                  ? "/dashboard/profile"
                  : `/dashboard/profile/${user.Username}`
              }
              key={user.Email}
              className="search-result-items"
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

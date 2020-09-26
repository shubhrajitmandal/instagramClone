import React, { useContext, useState, Fragment } from "react";
import ImagePlaceholder from "../../assets/images/placeholder2.png";
import Appbar from "../layout/Appbar";
import { AuthContext } from "../../context/auth/AuthContext";
import Loader from "../layout/Loader";
import Spinner from "../layout/Spinner";

const PostForm = (props) => {
  const { loading, uploadPost } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [fileSrc, setFileSrc] = useState(null);
  const [caption, setCaption] = useState("");

  const handlePost = (e) => {
    e.preventDefault();
    uploadPost(file, caption, props.history);
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="dashboard">
      <Appbar />
      <Loader />
      <div className="container">
        <form className="post-form" onSubmit={(e) => handlePost(e)}>
          {!file && (
            <Fragment>
              <input
                type="file"
                className="post-imageInput"
                accept="image/*,video/*"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setFileSrc(URL.createObjectURL(e.target.files[0]));
                }}
              />
              <label className="post-image-label">
                <img
                  src={ImagePlaceholder}
                  alt="placeholder"
                  height="300"
                  width="300"
                />
                Choose a file...
              </label>
            </Fragment>
          )}
          {file && (
            <div
              className="preview-container"
              onClick={() => {
                setFile(null);
                setFileSrc(null);
              }}
            >
              <img src={fileSrc} alt="" className="post-preview" />
            </div>
          )}

          <textarea
            type="textarea"
            value={caption}
            placeholder="Add Caption..."
            onChange={(e) => setCaption(e.target.value)}
            className="post-textInput"
          />
          <input
            type="submit"
            value="post"
            className="post-submit"
            onClick={(e) => handlePost(e)}
          />
        </form>
      </div>
    </div>
  );
};

export default PostForm;

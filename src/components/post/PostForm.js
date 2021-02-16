import React, { useContext, useState, Fragment } from "react";
import ImagePlaceholder from "../../assets/images/placeholder2.png";
import Appbar from "../layout/Appbar";
import PostContext from "../../context/post/postContext";
import ProgressBar from "../layout/ProgressBar";
// import Spinner from "../layout/Spinner";

const PostForm = (props) => {
  const { uploadPost } = useContext(PostContext);
  const [percentage, setPercentage] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [fileSrc, setFileSrc] = useState(null);
  const [caption, setCaption] = useState("");

  const handlePost = (e) => {
    e.preventDefault();
    setUploading(true);
    uploadPost(file, caption, setPercentage);
  };

  return (
    <div className="dashboard">
      <Appbar />
      <ProgressBar percentage={percentage} />
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
                  height="250"
                  width="250"
                />
                Choose a file...
              </label>
            </Fragment>
          )}
          {file && (
            <div
              className="preview-container"
              onClick={() => {
                if (!uploading) {
                  setFile(null);
                  setFileSrc(null);
                }
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
      {/* <AppbarMenu /> */}
    </div>
  );
};

export default PostForm;

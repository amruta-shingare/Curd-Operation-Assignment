import React, { useState, useEffect } from "react";

function CreatePost({ close, addPost, updatePost, editPost }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (editPost) {
      setTitle(editPost.title);
      setDescription(editPost.description);
      setImage(editPost.image);
    }
  }, [editPost]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!["image/png","image/jpeg","image/jpg"].includes(file.type)) {
      alert("Only png, jpg or jpeg images allowed");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const savePostHandler = () => {

    if (!title || !description || !image) {
      alert("All fields are mandatory");
      return;
    }

    const postData = { title, description, image };

    if (editPost) {
      updatePost({ ...postData, id: editPost.id });
    } else {
      addPost(postData);
    }

    close();
setTitle("");
setDescription("");
setImage("");
  };

  return (
    <div className="popup-wrapper">
      <div className="popup-box">

        <h2>{editPost ? "Edit Post" : "Create Post"}</h2>

        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}/>

        <textarea
          placeholder="Enter description"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}/>

        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleImage}/>

        <div>
          <button onClick={savePostHandler}>Save</button>
          <button onClick={close}>Cancel</button>
        </div>

      </div>
    </div>
  );
}

export default CreatePost;
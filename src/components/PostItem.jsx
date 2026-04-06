import React from "react";

const PostItem = ({ post, onEdit, onDelete }) => {

  return (
    <div className="post-card">

      <img
        src={post.image || "https://via.placeholder.com/400x200"}
        alt="post"
      />

      <h3>{post.title}</h3>

      <p>{post.description}</p>

      <div className="card-buttons">
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>

    </div>
  );
};

export default PostItem;
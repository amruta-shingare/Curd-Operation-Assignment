import React, { useState, useEffect } from "react";
import CreatePost from "../components/CreatePost";
import PostItem from "../components/PostItem";

const Home = () => {

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editPost, setEditPost] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("posts");
    if (data) setPosts(JSON.parse(data));
  }, []);
useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);
const addPost = (post) => {
    setPosts([...posts, { ...post, id: Date.now() }]);
  };
const updatePost = (updated) => {
    setPosts(posts.map(p =>
      p.id === updated.id ? updated : p
    ));
  };
const deletePost = (id) => {
const confirmDelete = window.confirm("Are you sure you want to delete this post?");
  if(!confirmDelete) 
    return;
setPosts(posts.filter(p => p.id !== id));
  };

  return (
    <div className="dashboard-layout">

      <h1>🚀 Post Manager Dashboard</h1>

      <button onClick={()=>{
        setEditPost(null);
        setOpen(true);}}>Create Post</button>

      {open && (
        <CreatePost
          close={()=>setOpen(false)}
          addPost={addPost}
          updatePost={updatePost}
          editPost={editPost}/>)}

      <div className="post-grid">
        {posts.length === 0 ? (
          <p className="empty-msg">
            No posts available. Click "Create Post" to add one 🚀
          </p>
        ) : (
          posts.map(post => (
            <PostItem
              key={post.id}
              post={post}
              onEdit={()=>{
                setEditPost(post);
                setOpen(true);
              }}
              onDelete={()=>deletePost(post.id)}
            />
          ))
        )}
      </div>

    </div>
  );
};

export default Home;
import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";
import Navbar from "./Navbar";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { baseUrl } from "../Urls";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await axios.get(`${baseUrl}/api/posts/`);
    setPosts(res.data.data);
  };

  const createPost = async () => {
    const token = localStorage.getItem("token");
    await axios.post(
      `${baseUrl}/api/posts/create`,
      { content },
      { headers: { Authorization: token } }
    );
    toast.success("Posted crested Successfully")
    fetchPosts();
    setContent("");
  };

  // const updatePost = async (id) => {
  //   const token = localStorage.getItem("token");
  //   await axios.put(
  //     `http://localhost:5000/api/posts//update/${id}`,
  //     { content },
  //     { headers: { Authorization: token } }
  //   );
  //   fetchPosts();
  //   setContent("");
  // };

  const deletePost = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${baseUrl}/api/posts/delete/${id}`, {
        headers: { Authorization: token },
      });
      toast.success("post deleted")
      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      {isLoggedIn ? (
        <div className="flex bg-slate-800 min-h-[90vh] text-gray-300 items-center p-10 flex-col">
          <div className="join">
            <input
              type="text"
              value={content}
              className="input input-bordered join-item text-black md:w-96"
              onChange={(e) => setContent(e.target.value)}
              placeholder="Create a post"
            />
            <button
              onClick={createPost}
              className="btn join-item rounded-r-full"
            >
              Post
            </button>
          </div>

          <div className="mt-10 px-8">
          <h1 className="text-center w-[50%] mx-auto text-3xl font-medium mb-6 border-b-[2px] border-green-500">All Posts</h1>
            <div className="p-8">
            {posts.map((post) => (
              <div key={post._id} className="flex flex-col gap-4 p-4 bg-black mt-2 sm:mx-4 md:mx-0">
                <div className="flex justify-between">
                  <p className="text-xl font-medium text-green-500">{post.content}</p>
                  <button
                    onClick={() => deletePost(post._id)}
                    className="text-white bg-green-500 px-2 py-1 rounded-lg cursor-pointer"
                  >
                    Delete post
                  </button>
                </div>
                <div className="">
                  <Post post={post} fetchPosts={fetchPosts} />
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center text-3xl font-bold h-[80vh]">
          Please Login First
        </div>
      )}
    </>
  );
};

export default PostList;

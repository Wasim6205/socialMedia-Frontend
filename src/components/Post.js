import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"
import { baseUrl } from "../Urls";

const Post = ({ post, fetchPosts }) => {
  const [comment, setComment] = useState("");

  const likePost = async () => {
    try {
      const token = localStorage.getItem("token");
      const postData = await axios.put(
      `${baseUrl}/api/posts/like/${post._id}`,
      {},
      { headers: { Authorization: token } }
    );
    console.log(postData);
    toast.success("liked post")
    fetchPosts();
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const commentPost = async () => {
    const token = localStorage.getItem("token");
    await axios.post(
      `${baseUrl}/api/posts/comment/${post._id}`,
      { text: comment },
      { headers: { Authorization: token } }
    );
    toast.success("comments added")
    setComment("")
    fetchPosts();
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {/* <p>{post.content}</p> */}
      <div className="flex gap-2">
        <button onClick={likePost} className="bg-amber-600 px-2 py-1 rounded-md text-sm">Like</button>
        <input
          type="text"
          className="bg-transparent outline-none border-b-[1px]"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button onClick={commentPost} className="bg-teal-800 px-2 py-1 rounded-md text-sm">Comment</button>
      </div>
      <h2 className="border-b-[1px] border-green-500">Comments</h2>
      <div className="bg-emerald-800 text-white rounded-xl min-w-[150px] flex items-center flex-col gap-[1px]">
        {post.comments.map((c, index) => (
          <p key={index} className="text-sm px-4 py-1">{c.text}</p>
        ))}
      </div>
    </div>
  );
};

export default Post;

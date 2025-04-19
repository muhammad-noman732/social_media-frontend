import React from "react";
import { useNavigate } from "react-router-dom";

const PostContent = ({ post }) => {
  // Navigate to single post view
  const navigate = useNavigate()
  const handleViewPost = (postId) => {
    navigate(`/post/${postId}`);
  };
  return (
    <div onClick={() => handleViewPost(post._id)} className="cursor-pointer">
      <p className="mb-3 text-gray-800">{post?.content}</p>
      {post?.image && (
        <img
          src={post.image}
          alt="Post"
          className="w-full rounded-lg object-cover max-h-[500px]"
        />
      )}
    </div>
  );
};

export default PostContent;

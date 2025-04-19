import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaEllipsisH, FaTrashAlt, FaEdit, FaThumbsUp, FaRegThumbsUp, FaComment, FaShare } from 'react-icons/fa';
import PostItem from './PostItem';

const PostLists = () => {
  
  const { posts, loading, error } = useSelector((state) => state.posts);
  

  if (loading) return <p className="text-center text-blue-600">Loading posts...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!posts || posts.length === 0) return <p className="text-center text-gray-500">No posts yet. Create one!</p>;

  return (
    <div  className="max-w-xl mx-auto px-4 w-full space-y-6 ">
      {posts.map(post =>(
        <PostItem key={post?._id} post={post}/>
      ))}
        
     </div>
  );
};

export default PostLists;
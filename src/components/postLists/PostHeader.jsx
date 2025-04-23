import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaEllipsisH, FaEdit, FaTrashAlt } from "react-icons/fa";
import { deletePost , getAllPosts, getPostById } from "../../store/features/postSlice";
import { NavLink } from "react-router-dom";
import { getUserProfile } from "../../store/features/userProfileSlice";
import { getLoggedinUserPosts } from "../../store/features/loggedInuser.slice";

const PostHeader = ({ post }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const toggleMenu = (postId) => {
    setOpenMenu(openMenu === postId ? null : postId);
  };

  const handleDelete = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost(postId)).then(()=>{
        dispatch(getAllPosts());
        dispatch(getLoggedinUserPosts()) // for deletion on the profilepage
    
      })
      
    }
  };
  const isOwner = user?._id && post?.author?._id && 
                          String(user._id) === String(post.author._id);

  return (
    <div className="flex items-center justify-between mb-3">
  {/* Author Info with Link */}
  <div className="flex items-center">
    <NavLink to={`/profile/${post?.author?._id}`} className="flex items-center">
      <img
        src={post?.author?.profilePicture || "https://via.placeholder.com/40"}
        alt="Profile"
        className="w-10 h-10 rounded-full object-cover mr-3"
      />
      <div className="leading-tight">
        <p className="font-semibold text-sm text-gray-800 hover:underline">
          {post?.author?.userName || "Unknown User"}
        </p>
        <p className="text-xs text-gray-500">
          {new Date(post.createdAt).toLocaleString()}
        </p>
      </div>
    </NavLink>
  </div>

      {/* Options Menu for Post Owner */}
      {isOwner && (
        <div className="relative">
          <button
            className="text-gray-500 hover:bg-gray-100 p-2 rounded-full"
            onClick={() => toggleMenu(post._id)}
          >
            <FaEllipsisH />
          </button>

          {openMenu === post._id && (
            <div className="absolute right-0 mt-1 bg-white shadow-lg rounded-md z-10 border border-gray-200 w-32">
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center text-gray-700"
                onClick={() => {
                  navigate(`/posts/${post._id}/edit`);
                  setOpenMenu(null);
                }}
              >
                <FaEdit className="mr-2 text-blue-500" /> Edit
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center text-gray-700"
                onClick={() => {
                  handleDelete(post._id);
                  setOpenMenu(null);
                }}
              >
                <FaTrashAlt className="mr-2 text-red-500" /> Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostHeader;

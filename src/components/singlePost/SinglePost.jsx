import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaEllipsisH,
  FaTrashAlt,
  FaEdit,
  FaThumbsUp,
  FaRegThumbsUp, 
  FaComment,
  FaShare,
} from "react-icons/fa";
import { deletePost, getPostById } from "../../store/features/postSlice";


const SinglePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams(); // Get the postId from the URL
  const { loading, error, currentPost } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  
  const [openMenu, setOpenMenu] = useState(false);

  // Fetch the post data when the component loads
  useEffect(() => {
    if (postId) {
      dispatch(getPostById(postId));
    }
  }, [dispatch, postId]);

  // Handle menu toggle
  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  // Handle delete post with confirmation
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost(postId));
      navigate('/'); // Navigate back to home after deletion
    }
  };

  if (loading) return <p className="text-center text-blue-600">Loading post...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!currentPost) return <p className="text-center text-red-500">Post not found!</p>;

  //Check if user is post owner - safely compare IDs
  const isOwner =
    user?._id &&
    currentPost?.author?._id &&
    String(user._id) === String(currentPost.author._id);

  return (
    <div className="max-w-2xl mx-auto my-16 space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Post Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img
              src={
                currentPost?.author?.profilePicture ||
                "https://via.placeholder.com/40"
              }
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover mr-3"
            />
            <div>
              <p className="font-semibold text-lg">
                {currentPost?.author?.userName || "Unknown User"}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(currentPost?.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Options Menu - only for post owner */}
          {isOwner && (
            <div className="relative">
              <button 
                className="text-gray-500 hover:bg-gray-100 p-2 rounded-full"
                onClick={toggleMenu}
              >
                <FaEllipsisH />
              </button>
              
              {/* Dropdown Menu */}
              {openMenu && (
                <div className="absolute right-0 mt-1 bg-white shadow-lg rounded-md z-10 border border-gray-200 w-32">
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center text-gray-700"
                    onClick={() => {
                      navigate(`/posts/${currentPost._id}/edit`);
                      setOpenMenu(false);
                    }}
                  >
                    <FaEdit className="mr-2 text-blue-500" /> Edit
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center text-gray-700"
                    onClick={() => {
                      handleDelete();
                      setOpenMenu(false);
                    }}
                  >
                    <FaTrashAlt className="mr-2 text-red-500" /> Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Post Content */}
        <div className="my-4">
          <p className="text-gray-800 text-lg mb-4">{currentPost?.content}</p>
          {currentPost?.image && (
            <img
              src={currentPost.image}
              alt="Post"
              className="w-full rounded-lg object-cover max-h-[600px]"
            />
          )}
        </div>

        {/* Engagement Stats */}
        <div className="flex justify-between text-sm text-gray-500 mt-6 pb-2 border-b">
          <div>{currentPost?.likes?.length || 0} likes</div>
          <div>{currentPost?.comments?.length || 0} comments</div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-3 mt-2">
          <button className="flex items-center justify-center w-1/3 text-gray-600 hover:bg-gray-100 py-2 rounded-md">
            <FaRegThumbsUp className="mr-2" /> Like
          </button>
          <button className="flex items-center justify-center w-1/3 text-gray-600 hover:bg-gray-100 py-2 rounded-md">
            <FaComment className="mr-2" /> Comment
          </button>
          <button className="flex items-center justify-center w-1/3 text-gray-600 hover:bg-gray-100 py-2 rounded-md">
            <FaShare className="mr-2" /> Share
          </button>
        </div>
        
        {/* Comments Section (placeholder) */}
        <div className="mt-6 pt-4 border-t">
          <h3 className="font-medium mb-4">Comments</h3>
          {currentPost?.comments && currentPost.comments.length > 0 ? (
            currentPost.comments.map((comment) => (
              <div key={comment._id} className="flex mb-4">
                <img
                  className="w-8 h-8 rounded-full mr-3"
                  src="https://via.placeholder.com/32"
                  alt="Commenter"
                />
                <div className="bg-gray-100 p-3 rounded-lg flex-1">
                  <p className="font-medium text-sm">@{comment.author.userName || "user"}</p>
                  <p className="text-sm mt-1">{comment.text}</p>
                  <div className="text-xs text-gray-500 mt-1">{new Date(comment.createdAt).toLocaleString()}</div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
          )}
          
          {/* Comment Form */}
          <div className="mt-4 flex">
            <input
              type="text"
              placeholder="Write a comment..."
              className="flex-1 border border-gray-300 rounded-l-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
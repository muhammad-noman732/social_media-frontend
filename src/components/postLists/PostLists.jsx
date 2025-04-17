import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaEllipsisH, FaTrashAlt, FaEdit, FaThumbsUp, FaRegThumbsUp, FaComment, FaShare } from 'react-icons/fa';
import { deletePost, getAllPosts } from '../../store/features/postSlice';
import { likePost, unlikePost } from '../../store/features/postLikeSlice';

const PostLists = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts, loading, error } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  const [openMenu, setOpenMenu] = useState(null);
  
  // Handle menu toggle
  const toggleMenu = (postId) => {
    setOpenMenu(openMenu === postId ? null : postId);
  };
  
  // Handle delete post with confirmation
  const handleDelete = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePost(postId));
    }
  };

  // Navigate to single post view
  const handleViewPost = (postId) => {
    navigate(`/post/${postId}`);
  };

  // Simple function to handle clicking the like button
  const handleLikeClick = (post) => {
    if (!user || !user._id) return; // Make sure user is logged in
    
    // Check if the current user's ID is in the post's likes array
    const userHasLiked = post.likes.some(like => 
      // If likes contain user IDs as strings
      (typeof like === 'string' && like === user._id) ||
      // Or if likes contain user objects with _id property
      (like._id && like._id === user._id)
    );
    
    if (userHasLiked) {
      // User already liked this post, so unlike it
      dispatch(unlikePost(post._id))
        .then(() => {
          // Refresh posts to get updated like counts
          dispatch(getAllPosts());
        });
    } else {
      // User hasn't liked this post yet, so like it
      dispatch(likePost(post._id))
        .then(() => {
          // Refresh posts to get updated like counts
          dispatch(getAllPosts());
        });
    }
  };

  if (loading) return <p className="text-center text-blue-600">Loading posts...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!posts || posts.length === 0) return <p className="text-center text-gray-500">No posts yet. Create one!</p>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {posts.map((post) => {
        // Check if user is post owner
        const isOwner = user?._id && post?.author?._id && 
                        String(user._id) === String(post.author._id);
        
        // Check if the user has liked this post
        const userHasLiked = post.likes  && post.likes.some(like => 
          (typeof like === 'string' && like === user?._id) ||
          (like._id && like._id === user?._id)
        );
        
        return (
          <div key={post?._id} className="bg-white p-4 rounded-lg shadow-md">
            {/* Post Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <img
                  src={post?.author?.profilePicture || 'https://via.placeholder.com/40'}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div>
                  <p className="font-semibold">{post?.author?.userName || 'Unknown User'}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(post?.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              
              {/* Options Menu - only for post owner */}
              {isOwner && (
                <div className="relative">
                  <button 
                    className="text-gray-500 hover:bg-gray-100 p-2 rounded-full"
                    onClick={() => toggleMenu(post._id)}
                  >
                    <FaEllipsisH />
                  </button>
                  
                  {/* Dropdown Menu */}
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
            
            {/* Post Content - clickable to view details */}
            <div 
              onClick={() => handleViewPost(post._id)} 
              className="cursor-pointer"
            >
              <p className="mb-3 text-gray-800">{post?.content}</p>
              {post?.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full rounded-lg object-cover max-h-[500px]"
                />
              )}
            </div>
            
            {/* Engagement Stats */}
            <div className="flex justify-between text-xs text-gray-500 mt-3 pb-2 border-b">
              <div>{post?.likes?.length || 0} likes</div>
              <div>{post?.comments?.length || 0} comments</div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-between pt-2 mt-1">
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent post click event
                  handleLikeClick(post);
                }}
                className={`flex items-center justify-center w-1/3 py-1 rounded-md ${
                  userHasLiked ? 'text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {userHasLiked ? (
                  <>
                    <FaThumbsUp className="mr-2" /> Liked
                  </>
                ) : (
                  <>
                    <FaRegThumbsUp className="mr-2" /> Like
                  </>
                )}
              </button>
              <button 
                className="flex items-center justify-center w-1/3 text-gray-600 hover:bg-gray-100 py-1 rounded-md"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent post click event
                  handleViewPost(post._id);
                }}
              >
                <FaComment className="mr-2" /> Comment
              </button>
              <button className="flex items-center justify-center w-1/3 text-gray-600 hover:bg-gray-100 py-1 rounded-md">
                <FaShare className="mr-2" /> Share
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostLists;
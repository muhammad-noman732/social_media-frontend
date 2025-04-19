import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaThumbsUp, FaRegThumbsUp, FaComment, FaShare } from 'react-icons/fa';
import { likePost, unlikePost } from '../../store/features/postLikeSlice';
import { getAllPosts, getPostById } from '../../store/features/postSlice';
import { useNavigate } from 'react-router-dom';

const PostActions = ({ post}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth);

  const handleLikeClick = (post) => {
    if (!user || !user._id) return;

    const userHasLiked = post.likes.some(like =>
      (typeof like === 'string' && like === user._id) ||
      (like._id && like._id === user._id)
    );

    if (userHasLiked) {
      dispatch(unlikePost(post._id)).then(() => {
        dispatch(getAllPosts());
        dispatch(getPostById(post._id)); // 👈 update single post
      });
    } else {
      dispatch(likePost(post._id)).then(() => {
        dispatch(getAllPosts());
        dispatch(getPostById(post._id))
       

      });
    }
  };

   // Navigate to single post view
   const handleViewPost = (postId) => {
    navigate(`/post/${postId}`);
  };


  const userHasLiked = post.likes?.some(like =>
    (typeof like === 'string' && like === user?._id) ||
    (like._id && like._id === user?._id)
  );

  return (
    <div className="flex justify-between pt-2 mt-1">
      <button
        onClick={(e) => {
          e.stopPropagation();
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
          e.stopPropagation();
          handleViewPost(post._id);
        }}
      >
        <FaComment className="mr-2" /> Comment
      </button>

      <button className="flex items-center justify-center w-1/3 text-gray-600 hover:bg-gray-100 py-1 rounded-md">
        <FaShare className="mr-2" /> Share
      </button>
    </div>
  );
};

export default PostActions;

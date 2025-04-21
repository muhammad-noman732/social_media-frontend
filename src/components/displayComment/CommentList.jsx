import { useDispatch, useSelector } from "react-redux";
import {
  setEditCommentId,
  deleteComment,
  likeComment,
  unLikeComment,
  getPostById,
} from "../../store/features/postSlice";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaThumbsUp } from "react-icons/fa";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime); // to get date in format 3 days ago

const CommentList = () => {
  const dispatch = useDispatch();
  const { currentPost, loading, error } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  const { postId } = useParams();
  const [openMenu, setOpenMenu] = useState(null); // stores open dropdown comment id

  const toggleMenu = (commentId) => {
    setOpenMenu((prev) => (prev === commentId ? null : commentId));
  };

  const deleteCommentHandler = (commentId) => {
    dispatch(deleteComment({ postId, commentId }));
    setOpenMenu(null); // close menu after deleting
  };

  //  like coment

  const commentLikeHandler = (commentId) => {
    //  first check user liked or not
    // sb se pehly to comment ko find krna
    const comment = currentPost.comments.find(
      (comment) => comment._id === commentId
    );
    //   now check user like it or not
    const isLiked = comment?.likes.some((id) => id.toString() === user?._id);

    if (isLiked) {
      dispatch(unLikeComment({ postId, commentId })).then(() => {
        dispatch(getPostById(currentPost?._id));
      });
    } else {
      dispatch(likeComment({ postId, commentId })).then(() => {
        dispatch(getPostById(currentPost?._id));
      });
    }
  };

  //  convert date into 2h format
  const getShortAgo = (date) => {
    const [num, unit] = dayjs(date).fromNow().split(" ");
    //  only get first digit from unit
    const shortMap = {
      second: "s",
      seconds: "s",
      minute: "m",
      minutes: "m",
      hour: "h",
      hours: "h",
      day: "d",
      days: "d",
      week: "w",
      weeks: "w",
      month: "mo",
      months: "mo",
      year: "y",
      years: "y",
    };

    return `${num}${shortMap[unit] || unit}`;
  };

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (!currentPost?.comments?.length) {
    return (
      <p className="text-gray-500">No comments yet. Be the first to comment!</p>
    );
  }

  return (
    <div className="mt-4 space-y-4">
      {currentPost.comments.map((comment) => {
        const isOwner = comment.author?._id === user?._id; // owner of the comment
        const isLiked = comment?.likes.some(
          (id) => id.toString() === user?._id
        );
        return (
          <div
            key={comment._id}
            className="flex items-start gap-2 relative group"
          >
            {/* Profile Picture */}
            <img
              src={comment.author?.profilePicture}
              alt="profile"
              className="w-10 h-10 rounded-full"
            />

            {/* Comment Box */}
            <div className="bg-gray-100 rounded-xl px-4 py-2 max-w-xl w-fit">
              <div className="font-bold text-sm">{comment.author.userName}</div>
              <p className="text-medium text-gray-800">{comment.text}</p>
              <div className="flex gap-4">
                <span className="text-gray-600 text-sm">
                  {getShortAgo(comment.createdAt)}
                </span>
                <p
                  className={`text-sm ${
                    isLiked ? "text-blue-500 font-semibold" : "text-gray-600"
                  }`}
                  onClick={() => {
                    commentLikeHandler(comment?._id);
                  }}
                >
                  {isLiked ? "liked" : "like"}
                </p>
                <p className="text-gray-600 text-sm">reply</p>
                
                {comment.likes.length > 0 && (
                  <p className="flex items-center gap-1 text-blue-500 text-sm">
                    {comment.likes.length} <FaThumbsUp />
                  </p>
                )}
              </div>
            </div>

            {/* More Options Button */}
            {isOwner && (
              <div className="relative mt-auto mb-7">
                <button
                  className="p-1 rounded-full hover:bg-gray-200"
                  onClick={() => toggleMenu(comment._id)}
                >
                  <FiMoreHorizontal size={20} />
                </button>

                {/* Dropdown */}
                {openMenu === comment._id && (
                  <div className="absolute right-0 mt-1 bg-white shadow-md rounded-md text-sm z-10">
                    <button
                      onClick={() => {
                        dispatch(setEditCommentId(comment._id));
                        setOpenMenu(null);
                      }}
                      className="block px-2 py-2 hover:bg-gray-100 w-full text-left"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCommentHandler(comment._id)}
                      className="block px-2 py-2 hover:bg-gray-100 w-full text-left text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;

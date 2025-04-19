import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost, getAllPosts, getPostById } from "../../store/features/postSlice";
import PostActions from "../postLists/PostActions";
import PostContent from "../postLists/PostContent";
import PostHeader from "../postLists/PostHeader";
import PostItem from "../postLists/PostItem";
import { createComment } from "../../store/features/commentsSlice";
import CommentList from "../displayComment/CommentList";

const SinglePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();
  const [text , setText ] = useState("")
  const { loading, error, currentPost } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  
  const postComment = (postId)=>{
    try {
      dispatch(createComment({
              postId,
              text
      })).then(() => {
              // dispatch(getAllPosts());
              dispatch(getPostById(postId))
            }).catch(()=>{
              console.log("error" , error);
              
            })
      
    } catch (error) {
      console.log("error" , error)
    }
     
  }

  useEffect(() => {
    if (postId) 
      dispatch(getPostById(postId));
  }, [dispatch, postId]);

  if (loading) return <p className="text-center text-blue-600">Loading post...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!currentPost) return <p className="text-center text-red-500">Post not found!</p>;

  return (
    <div className="max-w-2xl mx-auto my-16 space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <PostHeader post={currentPost} />
        
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

        <div className="flex justify-between text-sm text-gray-500 mt-6 pb-2 border-b">
          <div>{currentPost?.likes?.length || 0} likes</div>
          <div>{currentPost?.comments?.length || 0} comments</div>
        </div>
        <PostActions post={currentPost} />
        {/*  comment section */}
        <div className="flex justify-between gap-1 mt-3">
        <input type="text" placeholder="Add  a comment" 
        onChange={(e)=> setText(e.target.value)} 
        className='py-2 px-3 w-90  focus: border-t-green-300' />
        <button onClick={()=>{postComment(currentPost?._id)}} className="px-2 py-2 text-md rounded-md bg-green-400 text-white hover:bg-green-600">Add Comment</button>
        </div>
        <CommentList />
      </div>
    </div>
  );
};

export default SinglePost;

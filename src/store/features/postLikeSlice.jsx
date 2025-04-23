import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const likePost = createAsyncThunk("/posts/likepost", 
    async (postId, { rejectWithValue }) => {
      try {
         const token = localStorage.getItem("token")
        const response = await fetch(`http://localhost:3000/api/post/${postId}/like`, {
          method: "POST",
          headers:{
            Authorization: `Bearer ${token}`,
          },
        });
        
        const data = await response.json();
        console.log("data in likepost action", data);

        if (!response.ok) {
          return rejectWithValue(data.message || "Failed to like post");
        }
  
        return { postId, ...data };
      } catch (error) {
        return rejectWithValue(error.message || "Something went wrong");
      }
    }
);

export const unlikePost = createAsyncThunk("/posts/unlikepost", 
  async (postId, { rejectWithValue }) => {
    try {
       const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:3000/api/post/${postId}/unlike`, {
        method: "DELETE",
        headers:{
           Authorization: `Bearer ${token}`,
          "Content-Type":"Application/json"
        }
      });
      
      const data = await response.json();
      console.log("data in unlike action", data);

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to unlike post");
      }

      return { postId, ...data };
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

const postLikeSlice = createSlice({
  name: 'likes',
  initialState: {
    loading: false,
    error: null,
    likesByPostId: {} // Store like counts by post ID
  },

  reducers: {},

  extraReducers: (builder) => { 
    builder.addCase(likePost.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(likePost.fulfilled, (state, action) => {
        state.loading = false;
        // Store the likes info for this post
        state.likesByPostId[action.payload.postId] = {
          likes: action.payload.likes,
          likeCount: action.payload.likeCount
        };
    })
    .addCase(likePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error occurred';
    })
    .addCase(unlikePost.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(unlikePost.fulfilled, (state, action) => {
        state.loading = false;
        // Store the updated likes info for this post
        state.likesByPostId[action.payload.postId] = {
          likes: action.payload.likes,
          likeCount: action.payload.likeCount
        };
    })
    .addCase(unlikePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error occurred';
    })
  } 
})

export default postLikeSlice.reducer


// import { useDispatch, useSelector } from "react-redux";
// import {  setEditCommentId } from "../../store/features/postSlice";
// import { deleteComment } from "../../store/features/postSlice";
// import { useParams } from "react-router-dom";
// import { getPostById } from "../../store/features/postSlice";

// const CommentList = () => {
//   const dispatch = useDispatch();
//   const { currentPost, loading, error } = useSelector((state) => state.posts);
//   const { user } = useSelector((state) => state.auth);

//     // postid from url
//   const {postId} = useParams()
//   if  (loading) return <p>Loading comments...</p>;
//   if  (error) return <p className="text-red-500">{error}</p>;

//   const deleteCommentHandler = (commentId)=>{
//              dispatch(deleteComment({postId , commentId}))
             
//   }



//   if (!currentPost?.comments?.length) {
//     return <p className="text-gray-500">No comments yet. Be the first to comment!</p>;
//   }




//   return (
//     <div className="mt-4">

//       {currentPost.comments.map((comment) => {
//         //  get the id of owner of comment
//         const isOwner = comment.author?._id === user?._id;
//         console.log(`Checking comment "${comment.text}" by ${comment.author?._id}`);
//         console.log("logged in user id " , user._id);
        
        
//         return (
//          <div key={comment._id} className=" py-2">
//            <div className="flex justify-between">
//             <div className="">
//               <img
//                 src={comment.author?.profilePicture}
//                 alt="profile"
//                 className="w-6 h-6 rounded-full"
//               />
//             </div>
//             {isOwner && (
//               <div className="flex gap-2">
//               <button
//                 className="bg-red-500 text-white text-sm px-2 py-1 rounded"
//                 onClick={() =>  dispatch(setEditCommentId(comment._id))
//                             }
//                  >
//                 Edit
//               </button>
//               <button className="bg-gray-300 text-sm px-2 py-1 rounded"
//               onClick={()=>{deleteCommentHandler  (comment._id)}}
                
//               >Del
//               </button>
//             </div>
//             )}
           
//           </div>
//           <div className=" flex-col text-2xl rounded-md py-2 px-2 bg-gray-200">
//           <h2>{comment.author.userName}</h2>
//           <p className="ml-8 text-gray-700 bg-gray-200 w-120 ">{comment.text}</p>
//           </div>
         
//         </div>
          
//       )})}
//     </div>
//   );
// };

// export default CommentList;

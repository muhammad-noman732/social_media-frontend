import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'




export const createPost = createAsyncThunk("/posts/createpost", 
    async (formData, { rejectWithValue }) => {
      try {
         const token = localStorage.getItem("token")
        const response = await fetch("http://localhost:3000/api/post/create", {
          method: "POST",
          headers:{
            "Authorization": token,
          },
          body: formData, 
        });
        
        console.log("response in createpost action" , response);
        const data = await response.json();
        console.log("data in createpost action" , data);

        if (!response.ok) {
          return rejectWithValue(data.message || "Post creation failed");
        }
  
        return data;
      } catch (error) {
        return rejectWithValue(error.message || "Something went wrong");
      }
    }
  );

  export const getAllPosts = createAsyncThunk("/posts/getposts", 
    async (_ ,{ rejectWithValue }) => {
      try {
         const token = localStorage.getItem("token")
        const response = await fetch("http://localhost:3000/api/post/", {
          method: "GET",
          headers:{
            "Authorization": token,
          }
        });
        
        console.log("response in getallposts action" , response);
        const data = await response.json();
        console.log("data in createpost action" , data);

        if (!response.ok) {
          return rejectWithValue(data.message || "geting posts failed");
        }
  
        return data
      } catch (error) {
        return rejectWithValue(error.message || "Something went wrong in geting posts");
      }
    }
  );
  
export const getPostById  = createAsyncThunk("/posts/getpost", 
  async (postId  , { rejectWithValue }) => {
    try {
       const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:3000/api/post/${postId}`, {
        method: "GET",
        headers:{
          "Authorization": token,
          "Content-Type":"Application/json"
        }
      });
      
      console.log("response in geting post by id action" , response);
      const data = await response.json();
      console.log("data in createpost action" , data);

      if (!response.ok) {
        return rejectWithValue(data.message || "geting posts failed");
      }

      return data
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong in geting posts");
    }
  }
);

export const deletePost  = createAsyncThunk("/posts/deletepost", 
  async (postId  , { rejectWithValue }) => {
    try {
       const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:3000/api/post/${postId}`, {
        method: "DELETE",
        headers:{
          "Authorization": token,
          "Content-Type":"Application/json"
        }
      });
      
      console.log("response in geting deletepost action" , response);
      const data = await response.json();
      console.log("data in delete action" , data);

      if (!response.ok) {
        return rejectWithValue(data.message || "geting posts failed");
      }

      return data.data._id;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong in deleting posts");
    }
  }
);

//  create comment
export const createComment = createAsyncThunk("/comment/createComment" ,
  async({text , postId},{rejectWithValue})=>{
     try {
       const token = localStorage.getItem("token")
         const response = await fetch(`http://localhost:3000/api/post/${postId}/comments`,{
           method:"POST",
           headers:{
             "Content-Type":"application/json",
             "Authorization": token
           },
           body:JSON.stringify({
             text
           })
         });
         console.log("response" , response);
         const data = await response.json();
         console.log("data in create comment action" , data);
         if(!response.ok){
            return rejectWithValue(data.error || "Comment creation failed") 
         }
         return data

     } catch (error) {
         return  rejectWithValue(error.message)
     }
    
 }
)


//  edit comment (vip)
export const editComment  = createAsyncThunk("/comment/editComment" ,
async({newText , postId , commentId}, {rejectWithValue}) => {
  try {
    const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:3000/api/post/${postId}/comments/${commentId}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          "Authorization": token
        },
        body:JSON.stringify({
          text : newText
        })
      });

      console.log("response" , response);
      const data = await response.json();
      console.log("data  in edit comment action" , data);
      if(!response.ok){
         return rejectWithValue(data.error || "Comment editing  failed") 
      }
      return {postId , data : data.updatedPost }

  } catch (error) {
      return  rejectWithValue(error.message)
  }
 
}
)

//  delete comment
export const deleteComment = createAsyncThunk("/comment/deleteComment" ,
async({postId , commentId}, {rejectWithValue}) => {
  try {
    const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:3000/api/post/${postId}/comments/${commentId}`,{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json",
          "Authorization": token
        },
        
      });

      console.log("response" , response);
      const data = await response.json();
      console.log("data  in delete comment action" , data);
      if(!response.ok){
         return rejectWithValue(data.error || "Comment deletion  failed") 
      }
      return data

  } catch (error) {
      return  rejectWithValue(error.message)
  }
 
}
)

//  like a comment 
export const likeComment = createAsyncThunk("/comment/likecomment", 
  async ({postId, commentId} , { rejectWithValue }) => {
    try {
       const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:3000/api/post/${postId}/comments/${commentId}/like`, {
        method: "PUT",
        headers:{
          "Authorization": token,
        },
      });
      
      const data = await response.json();
      console.log("data in likecomment  action", data);

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to like post");
      }

      return  data ;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

//  unlike a comment 
export const unLikeComment = createAsyncThunk("/comment/unlikecomment", 
  async ({postId, commentId} , { rejectWithValue }) => {
    try {
       const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:3000/api/post/${postId}/comments/${commentId}/unlike`, {
        method: "DELETE",
        headers:{
          "Authorization": token,
        },
      });
      
      const data = await response.json();
      console.log("data in unlikecomment  action", data);

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to like post");
      }

      return  data ;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);


const postSlice = createSlice({
  name: 'posts',
  initialState:{
       posts:[],
       currentPost : null, // for single post
       loading : false,
       error:null,
       updatedCommentId : null,
       commentLikes : {}
       },

    reducers: {
        resetPosts: (state) => {
          state.posts = [];
          state.error = null;
          state.loading = false;
        },
        setEditCommentId :(state , action)=>{
          console.log("id in action of updating todos" , action.payload);
          state.updatedCommentId = action.payload;
      }
      },
      
  

   extraReducers: (builder) => { 
      builder.addCase(createPost.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        builder.addCase(createPost.fulfilled, (state, action) => {
          console.log("data in post creation reducer", action.payload);
          state.loading = false;
          // Add the new post to the beginning of the posts array
          state.posts = [action.payload.data , ...state.posts];
      })
        builder.addCase(createPost.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || 'Unknown error occurred';
       })
    //  for geting posts
       builder.addCase(getAllPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
       })
       builder.addCase(getAllPosts.fulfilled, (state, action) => {
        console.log("data in get all post reducer", action.payload);
        state.loading = false;
        // Access the data array directly from the response
        state.posts = action.payload.data;
    })
       builder.addCase(getAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error occurred';
     })
    //  for getPost By id
    builder.addCase(getPostById.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.currentPost = null; // for single post
     })
    builder.addCase(getPostById.fulfilled, (state, action) => {
        console.log("data in get by id reducer" , action.payload?.data);
        state.loading = false;
        state.currentPost = action.payload?.data
    })
     builder.addCase(getPostById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Unknown error occurred';
      state.currentPost = null
   })
   //  for deleting By id
   builder.addCase(deletePost.pending, (state) => {
    state.loading = true;
    state.error = null;
    
   })
  builder.addCase(deletePost.fulfilled, (state, action) => {
      console.log("data in deletepost by id reducer" , action.payload);
      state.loading = false;
      state.posts = state.posts.filter(post=> post._id !== action.payload)
  })
   builder.addCase(deletePost.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload || 'Unknown error occurred';
 })
//   for createin comment
           builder.addCase(createComment.pending , (state , action)=>{
             state.loading = true;
             state.error = null
           })
           builder.addCase(createComment.rejected , (state , action)=>{
            state.loading = false
            state.error = action.payload
          })
          builder.addCase(createComment.fulfilled , (state , action)=>{
            console.log("data in create comment reducer" , action.payload);
            // Add the new comment to the existing list of comments
            state.currentPost  = action.payload;
            console.log("state.currentpost.comments" , state.currentPost);
            
            state.loading = false;
            state.error = null
          })

//   for deleting comment 
builder.addCase(deleteComment.pending, (state) => {
          state.loading = true;
        state.error = null;
 })
//   in state we have to find comments from currentPost comments and filter it
builder.addCase(deleteComment.fulfilled, (state, action) => {
        console.log("data in delete comment by id reducer" , action.payload);
        state.loading = false;
        state.currentPost.comments = state.currentPost.comments.filter(comment => comment._id !== action.payload.commentId)
})
 builder.addCase(deleteComment.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload || 'Unknown error occurred';
})
       //   edit comment
 //   in state we have to find comments from currentPost comments and  update it 
 builder.addCase(editComment.fulfilled, (state, action) => {
  console.log("data in updateComment by id reducer", action.payload);
  
   const updatedPost = action.payload.data; 
   state.loading = false;
  
  // state.currentPost.comments = state.currentPost.comments.map(
  //   comment => (comment._id === updatedComment._id ? updatedComment : comment)
  // );
  state.currentPost = updatedPost; // replace the whole post (clean and simple)
  

});
builder.addCase(editComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Unknown error occurred';
})
builder.addCase(editComment.pending, (state, action) => {
     state.loading = true;
    state.error = null;
  })
  

  //  like comment reducer 
  builder.addCase(likeComment.fulfilled, (state, action) => {
     console.log("data in likeComment by id reducer", action.payload); 
     state.loading = false;
     state.commentLikes[action.payload._id] = {
      likes : action.payload.likes,
      likeCount : action.payload.likeCount,
     }
  });
  builder.addCase(likeComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error occurred';
  })
  builder.addCase(likeComment.pending, (state, action) => {
       state.loading = true;
      state.error = null;
    })
    
    //  unlike comment reducer 
    builder.addCase(unLikeComment.fulfilled, (state, action) => {
      console.log("data in unlikeComment by id reducer", action.payload); 
      state.loading = false;
      state.commentLikes[action.payload._id] = {
       likes : action.payload.likes,
       likeCount : action.payload.likeCount,
      }
   });
   builder.addCase(unLikeComment.rejected, (state, action) => {
         state.loading = false;
         state.error = action.payload || 'Unknown error occurred';
   })
   builder.addCase(unLikeComment.pending, (state, action) => {
        state.loading = true;
        state.error = null;
     })
     
   
   

   }
})

export const { resetPosts  , setEditCommentId} = postSlice.actions
export default postSlice.reducer
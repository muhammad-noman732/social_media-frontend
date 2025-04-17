import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const likePost = createAsyncThunk("/posts/likepost", 
    async (postId, { rejectWithValue }) => {
      try {
         const token = localStorage.getItem("token")
        const response = await fetch(`http://localhost:3000/api/post/${postId}/like`, {
          method: "POST",
          headers:{
            "Authorization": token,
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
          "Authorization": token,
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
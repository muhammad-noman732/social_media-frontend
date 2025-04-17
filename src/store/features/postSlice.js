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
const postSlice = createSlice({
  name: 'posts',
  initialState:{
       posts:[],
       currentPost : null, // for single post
       loading : false,
       error:null
       },

    reducers: {
        resetPosts: (state) => {
          state.posts = [];
          state.error = null;
          state.loading = false;
        },
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
          state.posts = [action.payload.data, ...state.posts];
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
        console.log("data in get all post reducer" , action.payload);
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
   }
})

export const { resetPosts } = postSlice.actions
export default postSlice.reducer
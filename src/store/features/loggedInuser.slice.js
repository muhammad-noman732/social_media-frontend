import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'



//  logged in user posts 
export const getLoggedinUserPosts = createAsyncThunk('/posts/loggedinuserposts' , 
     async( _ ,  {rejectWithValue}) =>{
      try {
        
        const token = localStorage.getItem('token');

        const response  = await fetch(`http://localhost:3000/api/post/me` , {
         method :"GET",
         headers:{
           "Content-type":"application/json",
           Authorization :`Bearer ${token}`
         }
        })
        console.log("response in get logged in user posts" , response);
        const data  = await response.json();
        console.log("data  in get logged in user posts" , data );

        if(!response.ok){
         return rejectWithValue(error.data  || "could not fetch user posts");

        }
        return data 

      } catch (error) {
          return rejectWithValue(data.message);
      }
    }
    )

const loggedinUserSlice = createSlice({
  name: 'userInfo',
  initialState:{
       loading : false,
       error:null,
       userPosts:[],
       },  

   extraReducers: (builder) => { 
    
    //   reducer for get current user posts

    builder.addCase(getLoggedinUserPosts.fulfilled, (state, action) => {
      console.log("data in loggedin user posts reducer", action.payload); 
      state.loading = false;
      state.userPosts = action.payload.data ;
   });
   builder.addCase(getLoggedinUserPosts.rejected, (state, action) => {
         state.loading = false;
         state.error = action.payload || 'Unknown error occurred';
   })
   builder.addCase(getLoggedinUserPosts.pending, (state, action) => {
        state.loading = true;
        state.error = null;
     })
   }
})

export default loggedinUserSlice.reducer
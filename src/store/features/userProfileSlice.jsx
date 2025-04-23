import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getUserProfile = createAsyncThunk("user/getuserInfo" , 
    async(_ ,{rejectWithValue}) =>{
        try {
            const token = localStorage.getItem("token")
            const respose = await fetch("http://localhost:3000/api/users/me" , {
               method:"GET",
               headers:{
                   "Content-type":"application/json",
                   Authorization: `Bearer ${token}`,
               }
              })
   
            console.log("response in getUser profile" , respose);
            const data = await respose.json(); 
              if(!respose.ok){
                 return rejectWithValue(data.message)
           }
            return data;
        
        } catch (error) {
            console.log("error" , error);
            return rejectWithValue(error.message);
        }
    }
)

export const uploadCoverPhoto = createAsyncThunk("user/uploadcoverphoto" , 
    async(formData , {rejectWithValue}) =>{
        try {
            const token = localStorage.getItem("token")
            const respose = await fetch("http://localhost:3000/api/users/me/coverPhoto" , {
               method:"PUT",
               headers:{
                 Authorization: `Bearer ${token}`,
               },
               body:  formData
            
              })
   
            console.log("response in coverphoto action" , respose);
            const data = await respose.json(); 
              if(!respose.ok){
                 return rejectWithValue(data.message)
           }
            return data;
        
        } catch (error) {
            console.log("error" , error);
            return rejectWithValue(error.message);
        }
    }
)

// upload profile phot
export const uploadProfilePhoto = createAsyncThunk("user/uploadprofilephoto" , 
  async(formData , {rejectWithValue}) =>{
      try {
          const token = localStorage.getItem("token")
          const respose = await fetch("http://localhost:3000/api/users/me/profilePicture" , {
             method:"PUT",
             headers:{
              Authorization: `Bearer ${token}`,
             },
             body:  formData

            })
 
          console.log("response in coverphoto action" , respose);
          const data = await respose.json(); 
            if(!respose.ok){
               return rejectWithValue(data.message)
         }
          return data;
      
      } catch (error) {
          console.log("error" , error);
          return rejectWithValue(error.message);
      }
  }
)

//   get any user info by its id 
export const getCurrentUserInfo  = createAsyncThunk("user/getcurrentuserInfo" , 
   async(id ,{rejectWithValue}) =>{
      try {
          const token = localStorage.getItem("token")
          const respose = await fetch(`http://localhost:3000/api/users/${id}` , {
             method:"GET",
             headers:{
                 "Content-type":"application/json",
                 Authorization: `Bearer ${token}`,
             }
            })
 
          console.log("response in getCurrentuser profile" , respose);
          const data = await respose.json(); 
            if(!respose.ok){
               return rejectWithValue(data.message)
         }
          return data;
      
      } catch (error) {
          console.log("error" , error);
          return rejectWithValue(error.message);
      }
  }
)


const userProfileSlice = createSlice({
    name: "user",

    initialState:{
        loading:false,
        error: null,
        profile: {},
        otherUserProfile : {}
    },
    reducers:{

    },
    extraReducers: (builder)=>{
           builder.addCase(getUserProfile.pending , (state , action)=>{
             state.loading = true;
             state.error = null
           }) 
           builder.addCase(getUserProfile.rejected , (state , action)=>{
            state.loading = false;
            state.error = action.payload;
           })
          builder.addCase(getUserProfile.fulfilled , (state , action)=>{
            console.log("data recieved from server in getuserProfile reducer" , action.payload);
            state.profile = action.payload.data;
            state.loading = false;
            state.error = null;
           })

        //   cover photo
        builder.addCase(uploadCoverPhoto.pending , (state , action)=>{
            state.loading = true;
            state.error = null
          }) 
          builder.addCase(uploadCoverPhoto.rejected , (state , action)=>{
           state.loading = false;
           state.error = action.payload;
         })
         builder.addCase(uploadCoverPhoto.fulfilled , (state , action)=>{
           console.log("data recieved from server in getuserProfile reducer" , action.payload);
           state.profile = action.payload.data;
           state.loading = false;
           state.error = null
         })

         //   profile picture
        builder.addCase(uploadProfilePhoto.pending , (state , action)=>{
          state.loading = true;
          state.error = null;
        }) 
        builder.addCase(uploadProfilePhoto.rejected , (state , action)=>{
         state.loading = false;
         state.error = action.payload;
       })
       builder.addCase(uploadProfilePhoto.fulfilled , (state , action)=>{
         console.log("data recieved from server in getuserProfile reducer" , action.payload);
         state.profile = action.payload.data;
         state.loading = false;
         state.error = null;
       })

        // get any user info
       builder.addCase(getCurrentUserInfo.pending , (state , action)=>{
        state.loading = true;
        state.error = null;
      }) 
      builder.addCase(getCurrentUserInfo.rejected , (state , action)=>{
       state.loading = false;
       state.error = action.payload;
     })
     builder.addCase(getCurrentUserInfo.fulfilled , (state , action)=>{
       console.log("data recieved from server in getuserProfile reducer" , action.payload);
       state.otherUserProfile = action.payload.data;
       state.loading = false;
       state.error = null;
     })
    }
})

export default userProfileSlice.reducer;
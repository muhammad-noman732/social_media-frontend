import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { act } from 'react';

export const registerUser = createAsyncThunk("/auth/registeruser" ,
     async({userName , email , password , location } , {rejectWithValue}) =>{
           try {
            const response = await fetch("http://localhost:3000/auth/signup" , {
              method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify({
                  userName,
                  email,
                  password,
                  location
                })
            })

            console.log("response in signup action" , response);
            const data = await response.json();
            if(!response.ok){
                // Handle backend validation errors
                return rejectWithValue(data.error || 'Registration failed');
            }

            console.log("data in signup action" , data);
            return data

           } catch (error) {
              return rejectWithValue(error.message);
           }
        })
        
export const loginUser = createAsyncThunk("/auth/loginuser" ,
          async({ email , password  } , {rejectWithValue}) =>{
                try {
                 const response = await fetch("http://localhost:3000/auth/login" , {
                   method:"POST",
                     headers:{
                         "Content-type":"application/json"
                     },
                     body:JSON.stringify({
                       email,
                       password,
                     })
                 })
     
                 console.log("response in signup action" , response);
                 const data = await response.json();
                 if(!response.ok){
                     // Handle backend validation errors
                     return rejectWithValue(data.error || 'login failed');
                 }
                 
                 console.log("data in login action" , data);
                 return data

                } catch (error) {
                   return rejectWithValue(error.message);
                }
             })

export const fetchCurrentUser = createAsyncThunk("/auth/fetchcurrentuser" , 
         async({rejectWithValue})=>{
            try {
              const token = localStorage.getItem("token");

              const response = await fetch("http://localhost:3000/auth/me" , {
                method:"GET",
                headers:{
                  "Content-type":"application/json",
                   "Authorization": token
                }
              })
             console.log("response in getcurrent user action" , response);
              const data = await response.json();

              if (!response.ok) {
                return rejectWithValue(data.message || "Failed to fetch user");
              }
              console.log("data in current reducer" , data);
              return data
              
            } catch (error) {
              return rejectWithValue(error.message || "Failed to fetch user");
              }
         })

const authSlice = createSlice({
  name: 'auth',
  initialState:{
       user :null,
       loading : false,
       error:null
       },

  reducers: {
         logout:(state , action)=>{
          state.user = null;
          state.loading =false;
          localStorage.removeItem("token");
          console.log("token in localestorage" , localStorage.getItem("token"));
         }
  },

  extraReducers: (builder) => { 
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error occurred';
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("data in login reducer" , action.payload);
         //  set token in locale storage
        const token = action.payload?.data?.token;
        console.log("token in login redcer" , token);
        localStorage.setItem("token", action.payload.data.token);
        console.log('Token saved to localStorage:', localStorage.getItem("token")); // Verify it's saved
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error occurred';
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        console.log("data in fetchcurrentuser redcer" , action.payload);
        
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error occurred';
      })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
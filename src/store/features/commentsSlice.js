import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


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


// export const createComment = createAsyncThunk("/comment/createComment" ,
//   async({text , postId},{rejectWithValue})=>{
//      try {
//        const token = localStorage.getItem("token")
//          const response = await fetch(`http://localhost:3000/api/post/${postId}/comments`,{
//            method:"POST",
//            headers:{
//              "Content-Type":"application/json",
//              "Authorization": token
//            },
//            body:JSON.stringify({
//              text
//            })
//          });
//          console.log("response" , response);
//          const data = response.json();
//          console.log("data in create comment action" , data);
//          if(!response.ok){
//             return rejectWithValue(data.error || "Comment creation failed") 
//          }
//          return data

//      } catch (error) {
//          return  rejectWithValue(error.message)
//      }
    
//  }
// )


const commentSlice =  createSlice({
    name:"comments",
    initialState:{
         comments: [],
         error:null,
         loading:false
    },
    reducers:{

    },
    extraReducers:(builder)=>{
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
            state.comments =  [ ...action.payload.comments , ...state.comments];
            state.loading = false;
            state.error = null
          })
    },

})


export default commentSlice.reducer
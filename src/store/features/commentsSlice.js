import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


// export const createComment = createAsyncThunk("/comment/createComment" ,
//      async({text , postId},{rejectWithValue})=>{
//         try {
//           const token = localStorage.getItem("token")
//             const response = await fetch(`http://localhost:3000/api/post/${postId}/comments`,{
//               method:"POST",
//               headers:{
//                 "Content-Type":"application/json",
//                 "Authorization": token
//               },
//               body:JSON.stringify({
//                 text
//               })
//             });
//             console.log("response" , response);
//             const data = await response.json();
//             console.log("data in create comment action" , data);
//             if(!response.ok){
//                return rejectWithValue(data.error || "Comment creation failed") 
//             }
//             return data

//         } catch (error) {
//             return  rejectWithValue(error.message)
//         }
       
//     }
// )

// //  edit comment (vip)
// export const editComment  = createAsyncThunk("/comment/editComment" ,
//   async({newText , postId , commentId}, {rejectWithValue}) => {
//      try {
//        const token = localStorage.getItem("token")
//          const response = await fetch(`http://localhost:3000/api/post/${postId}/comments/${commentId}`,{
//            method:"PUT",
//            headers:{
//              "Content-Type":"application/json",
//              "Authorization": token
//            },
//            body:JSON.stringify({
//              text : newText
//            })
//          });

//          console.log("response" , response);
//          const data = await response.json();
//          console.log("data  in edit comment action" , data);
//          if(!response.ok){
//             return rejectWithValue(data.error || "Comment editing  failed") 
//          }
//          return {postId , data }

//      } catch (error) {
//          return  rejectWithValue(error.message)
//      }
    
//  }
// )

// export const deleteComment = createAsyncThunk("/comment/deleteComment" ,
//   async({postId , commentId}, {rejectWithValue}) => {
//      try {
//        const token = localStorage.getItem("token")
//          const response = await fetch(`http://localhost:3000/api/post/${postId}/comments/${commentId}`,{
//            method:"DELETE",
//            headers:{
//              "Content-Type":"application/json",
//              "Authorization": token
//            },
           
//          });

//          console.log("response" , response);
//          const data = await response.json();
//          console.log("data  in delete comment action" , data);
//          if(!response.ok){
//             return rejectWithValue(data.error || "Comment deletion  failed") 
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
         loading:false,
         editCommentId: null,
    },
    reducers:{
    //   setEditCommentId:(state , action)=>{
    //     console.log("id in action of updating todos" , action.payload);
    //     state.editCommentId = action.payload
    // }

    },
    extraReducers:(builder)=>{
          //  builder.addCase(createComment.pending , (state , action)=>{
          //    state.loading = true;
          //    state.error = null
          //  })
          //  builder.addCase(createComment.rejected , (state , action)=>{
          //   state.loading = false
          //   state.error = action.payload
          // })
          // builder.addCase(createComment.fulfilled , (state , action)=>{
          //   console.log("data in create comment reducer" , action.payload);
          //   // Add the new comment to the existing list of comments
          //   state.comments =  [ action.payload, ...state.comments];
          //   state.loading = false;
          //   state.error = null
          // })
          // comment editing
        //   builder.addCase(editComment.fulfilled , (state , action) => {
        //   //  const { updatedComment } = action.payload; 
        //     console.log("data in edit comment reducer", action.payload);
        //     state.loading = false;
        //     state.error = null;
        //     state.editCommentId = null; // Reset edit mode after successful update

        //   });
        //   builder.addCase(editComment.pending, (state , action)=>{
        //     state.loading = true
        //     state.error = action.payload
        //   })
        //    builder.addCase(editComment.rejected , (state , action)=>{
        //    state.loading = false
        //    state.error = action.payload
        //    state.editCommentId = null
        //  })
        //       // comment delete 
        //    builder.addCase(deleteComment.fulfilled , (state , action) => {
        //       console.log("data in deletecomment reducer" , action.payload);
        //       state.loading = false;
        //       state.error = null;
        //       state.comments = state.comments.filter(comment => comment._id !== action.payload)
        //     });
        //     builder.addCase(deleteComment.rejected , (state , action)=>{
        //       console.log("data in deletecomment reducer" , action.payload);
        //      state.loading = false
        //      state.error = action.payload
        //    })
        //    builder.addCase(deleteComment.pending , (state , action)=>{
        //     state.loading = false
        //     state.error = action.payload
           
        //   })
    },

})

export const { setEditCommentId} = commentSlice.actions;
export default commentSlice.reducer
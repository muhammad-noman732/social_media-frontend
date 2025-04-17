import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, getAllPosts } from '../../store/features/postSlice';

const CreatePost = () => {
  const dispatch = useDispatch();
  const { loading, error  } = useSelector(state => state.posts);
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null)
//   useref
  const fileInputRef = useRef(null); // Create reference for file input


  const handleSubmit = async(e) => {
    try {
        e.preventDefault();

        if (!content.trim() && !image) {
          alert('Post cannot be empty!');
          return;
        }
    
        const formData = new FormData();
        formData.append('content', content); // as use content in backend 
        if (image) formData.append('file', image); 
    
       const action = await dispatch(createPost(formData));
       if(createPost.fulfilled.match(action)){
        //     Reset form
              setContent('');
              setImage(null);        
        dispatch(getAllPosts()); // refetch all posts to stay updated
       }

       if(fileInputRef.current){
         fileInputRef.current.value= '';
       }
    
        
    } catch (error) {
        console.log("error in creting post" , error)
    }
 
  };

  return (
    <div className="bg-gray-400 text-white p-4 rounded-lg shadow-md w-full max-w-xl mx-auto mb-5 my-17">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        ></textarea>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full text-sm"
          ref={fileInputRef} // Attach ref to file input
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? 'Posting...' : 'Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;

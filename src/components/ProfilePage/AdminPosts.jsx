import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostItem from '../postLists/PostItem';
import { getLoggedinUserPosts } from '../../store/features/loggedInuser.slice';

const AdminPosts = () => {
  const dispatch = useDispatch();
  const { userPosts, loading, error } = useSelector((state) => state.userInfo);
  const [activeTab, setActiveTab] = useState("posts");

//   useEffect(() => {
//      dispatch(getLoggedinUserPosts());
//   }, [dispatch]);


   const getPosts = ()=>{
    dispatch(getLoggedinUserPosts());
   }


  return (
    <div  className="max-w-2xl mx-auto px-4 sm:px-2 w-full space-y-6">
      
      <div className="border-b pb-2 mb-4 flex gap-6 justify-center text-gray-600 font-medium">
        <button
          className={`pb-1 ${activeTab === 'posts' ? 'border-b-2 border-blue-500 text-blue-600' : ''}`}
          onClick={() => { 
                 setActiveTab('posts')
                 getPosts()}}
        >
          Posts
        </button>
        <button
          className={`pb-1 ${activeTab === 'photos' ? 'border-b-2 border-blue-500 text-blue-600' : ''}`}
          onClick={() => setActiveTab('photos')}
        >
          Photos
        </button>
        <button
          className={`pb-1 ${activeTab === 'videos' ? 'border-b-2 border-blue-500 text-blue-600' : ''}`}
          onClick={() => {setActiveTab('videos')}}
        >
          Videos
        </button>
      </div>

      {/* Post Content Area */}
      {loading && <p className="text-center text-blue-600">Loading posts...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      {activeTab === 'posts' && (
        <>
          {userPosts?.length > 0 ? (
            userPosts.map(post => (
              <PostItem key={post._id} post={post} />
            ))
          ) : (
            <p className="text-center text-gray-500">No posts yet. Create one!</p>
          )}
        </>
      )}

      {activeTab === 'photos' && (
        <p className="text-center text-gray-500">Photos section coming soon...</p>
      )}

      {activeTab === 'videos' && (
        <p className="text-center text-gray-500">Videos section coming soon...</p>
      )}
    </div>
  );
};

export default AdminPosts;

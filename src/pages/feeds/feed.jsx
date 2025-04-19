import React, { useEffect } from 'react'
import CreatePost from '../../components/postCreation/CreatePost'
import PostLists from '../../components/postLists/PostLists'
import { useDispatch } from 'react-redux'
import { getAllPosts } from '../../store/features/postSlice'

const Feed = () => {
        const dispatch = useDispatch();
        const token = localStorage.getItem("token");
        
        useEffect(() => {
            if (token) {
              dispatch(getAllPosts());
            }
          }, [dispatch]); 
  return (
    <div className="w-full max-w-3xl mx-auto px-4 md:px-0">
      <CreatePost/>
      <PostLists/>
    </div>
  )
}

export default Feed

import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/features/authSlice';
import { useNavigate } from 'react-router-dom';
import CreatePost from '../../components/postCreation/CreatePost';
import PostLists from '../../components/postLists/PostLists';
import { getAllPosts } from '../../store/features/postSlice';

const Profle = () => {
    const dispatch = useDispatch();
     const navigate = useNavigate()
    const logoutHandler = ()=>{
        dispatch(logout());
        navigate('/login')
    }

   
  return (
    <div>
      
      <button className="rounded-md py-2 px-4 bg-red-400"
       onClick={logoutHandler}>logout</button>
       <CreatePost/>
       <PostLists/>
    </div>
  )
}

export default Profle

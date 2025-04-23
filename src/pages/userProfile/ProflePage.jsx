import React, { useEffect } from 'react'
import UserInfoContainer from '../../components/ProfilePage/UserInfoContainer';
import { useDispatch } from 'react-redux'
import { logout } from '../../store/features/authSlice';
import { useNavigate } from 'react-router-dom';
import CoverPhoto from '../../components/ProfilePage/CoverPhoto ';
import ProfilePicture from '../../components/ProfilePage/ProfilePicture ';
import AdminPosts from '../../components/ProfilePage/AdminPosts';


const ProfilePage = () => {
    
   
  return (
    <div className="pt-14 bg-gray-50 min-h-screen">
    <div className="relative w-full max-w-6xl mx-auto bg-white shadow">
      {/* cover photo */}
      <CoverPhoto />
      <div className="absolute -bottom-14 left-4 sm:left-10">
        <ProfilePicture />
      </div>
    </div>
  
    <div className="max-w-2xl mx-auto mt-20 px-4 sm:px-2">
      <UserInfoContainer />
    </div>
    <AdminPosts />
  </div>
  
  )
}

export default ProfilePage

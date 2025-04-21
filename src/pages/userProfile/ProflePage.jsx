import React, { useEffect } from 'react'
import UserInfoContainer from '../../components/ProfilePage/UserInfoContainer';
import { useDispatch } from 'react-redux'
import { logout } from '../../store/features/authSlice';
import { useNavigate } from 'react-router-dom';
import CoverPhoto from '../../components/ProfilePage/CoverPhoto ';
import ProfilePicture from '../../components/ProfilePage/ProfilePicture ';


const ProfilePage = () => {
    
   
  return (
    <div className="pt-20 bg-gray-100 min-h-screen">
    <div className="relative w-full max-w-6xl mx-auto bg-white shadow">
      <CoverPhoto />
      <div className="absolute -bottom-14 left-10">
        <ProfilePicture />
      </div>
    </div>

    <div className="max-w-6xl mx-auto mt-20 px-4">
      <UserInfoContainer />
      {/* Add more sections like friends, posts, etc here */}
    </div>
  </div>
  )
}

export default ProfilePage

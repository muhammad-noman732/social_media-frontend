import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getCurrentUserInfo } from '../../store/features/userProfileSlice';


const ProfileDetails = () => {
    const {userId} = useParams();
    const dispatch = useDispatch();
    console.log("user id " , userId)
    const {otherUserProfile} = useSelector(state => state.user);

     useEffect(() => {
         if (userId) 
           dispatch(getCurrentUserInfo(userId));
       }, [dispatch, userId]);
     
  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
    {/* Cover Photo Section */}
    <div className="relative w-full max-w-6xl mx-auto bg-white shadow-md">
      <img 
        src={otherUserProfile.coverPhoto} 
        className="w-full h-64 object-cover rounded-b-md"
        alt=''
      />

      {/* Profile Picture */}
      <div className="absolute -bottom-20 left-10">
        <img 
          src={otherUserProfile.profilePicture} 
          className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"
        />
      </div>
    </div>

    {/* User Info Section */}
    <div className="max-w-5xl mx-auto  px-39">
      <div className= "p-6 rounded-md    ">
        <h1 className="text-6xl font-bold text-gray-800">
          {otherUserProfile.userName || "User Name"}
        </h1>
      
      </div>
    </div>
  </div>
  )
}

export default ProfileDetails

import React, { useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../store/features/userProfileSlice';

const UserInfoContainer = () => {
  const dispatch = useDispatch();
  const { loading, profile, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  if (loading) return <div className="text-blue-600 animate-spin"><FaSpinner /></div>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="text-center sm:text-left">
    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
      {profile.userName}
    </h2>
  </div>
  );
};

export default UserInfoContainer;

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
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold">{profile?.userName}</h2>
      <p className="text-gray-600">{profile?.location || 'No location provided'}</p>
    </div>
  );
};

export default UserInfoContainer;

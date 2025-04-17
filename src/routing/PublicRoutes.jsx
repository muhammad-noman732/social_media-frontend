import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoutes = () => {
  const { user, loading } = useSelector(state => state.auth);

  // Wait for user info to load
  if (loading) {
    return <div className="text-center mt-10 text-xl">Loading...</div>;
  }

  return user ? <Navigate to="/" replace /> : <Outlet />;
}

export default PublicRoutes;

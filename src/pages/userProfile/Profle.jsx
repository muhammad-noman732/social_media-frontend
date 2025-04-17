import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/features/authSlice';
import { useNavigate } from 'react-router-dom';

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
    </div>
  )
}

export default Profle

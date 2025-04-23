import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadProfilePhoto } from '../../store/features/userProfileSlice';

const ProfilePicture = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();
  const fileInputRef = useRef();

  const { profile  , loading , error} = useSelector((state) => state.user);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const img = e.target.files[0];
    
    if (img) {
      setPreview(URL.createObjectURL(img));
      setFile(img);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("profilePicture", file); // must match with backend
    dispatch(uploadProfilePhoto(formData)).then(() => {
      setPreview(null);
      setFile(null);
    //   if(fileInputRef){
    //     fileInputRef.current.value = ""
    //   }
    });
  };

  useEffect(() => {
    if (file) {
      handleUpload();
    }
    //  clean from setpreview
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [file]);

  return (

    <div className="relative cursor-pointer w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white shadow-md">
  <img
    src={preview || profile.profilePicture}
    className="w-full h-full rounded-full object-cover"
    onClick={handleImageClick}
  />
  <input
    type="file"
    accept="image/*"
    onChange={handleChange}
    ref={fileInputRef}
    style={{ display: 'none' }}
  />
</div>
  );
};

export default ProfilePicture;

import React, { useState, useEffect, useRef } from 'react';
import { uploadCoverPhoto } from '../../store/features/userProfileSlice';
import { useDispatch, useSelector } from 'react-redux';

const CoverPhoto = () => {
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null); // File input reference
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setCoverPhoto(file);
    }
  };

  const CoverPhotoHandler = () => {
    if (!coverPhoto) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('coverPhoto', coverPhoto);

    dispatch(uploadCoverPhoto(formData))
      .unwrap()
      .then(() => {
        setCoverPhoto(null);
        setPreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      })
      .catch((error) => {
        console.log('error in uploading cover photo', error);
      });
  };

  // Cleanup preview URL
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const displayImage = preview || profile?.coverPhoto 

  return (
    <div className="relative h-90 bg-gray-200">
      <img
        src={displayImage}
        className="w-full h-full object-cover"
      />

      <div className="absolute bottom-2 right-2 flex gap-2 items-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="text-sm"
        />
        <button
          onClick={CoverPhotoHandler}
          className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
        >
          {profile?.coverPhoto ? 'Update Cover Photo' : 'Add Cover Photo'}
        </button>
      </div>
    </div>
  );
};

export default CoverPhoto;

import { useParams, useNavigate } from "react-router-dom";
import { IoPlaySkipBackOutline } from 'react-icons/io5'; 
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../Context/AuthContext';

const ProfilePicturePage = () => {
  const { profilePicUrl } = useParams();
  const navigate = useNavigate();
  const { authUser } = useAuthContext();
  const [profilePic, setProfilePic] = useState('');

  useEffect(() => {
    if (authUser) {
      setProfilePic(authUser.profilePic || decodeURLComponent(profilePicUrl));
    } else {
      setProfilePic(decodeURLComponent(profilePicUrl));
    }
  }, [authUser, profilePicUrl]);

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen p-4">
      <img 
        src={profilePic} 
        alt="Profile" 
        className="w-auto h-auto max-w-full max-h-full mb-4" 
      />
      <IoPlaySkipBackOutline 
        onClick={handleBackToHome} 
        className="text-2xl cursor-pointer w-10 h-10"
      />
    </div>
  );
};

export default ProfilePicturePage;

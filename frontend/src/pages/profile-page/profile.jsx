import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { IoPlaySkipBackOutline, IoCamera } from 'react-icons/io5'; 
import { useAuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify'; // Import toast function

const ProfilePage = () => {
  const { authUser } = useAuthContext();
  const [user, setUser] = useState({
    fullName: '',
    userName: '',
    email: '',
    profilePic: '',
  });
  const [newProfilePic, setNewProfilePic] = useState(null); 
  const navigate = useNavigate(); 

  useEffect(() => {
    if (authUser) {
      setUser({
        fullName: authUser.fullName,
        userName: authUser.userName,
        email: authUser.email,
        profilePic: authUser.profilePic,
      });
    }
  }, [authUser]);

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfilePic(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();
      if (newProfilePic) {
        const response = await fetch(newProfilePic);
        const blob = await response.blob();
        formData.append('profilePic', blob);
      }

      const res = await fetch("/api/auth/updateprofile", {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authtoken')}`, 
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setUser({
        fullName: data.fullName,
        userName: data.userName,
        email: data.email,
        profilePic: data.profilePic, 
      });

      // Show success message
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      
      // Show error message
      toast.error('Error updating profile. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-center text-gray-300">
            Profile
            <div className="flex items-center justify-center mt-2">
        <img
          src="/logo1.png"
          alt="Logo"
          className="w-8 h-8 mr-2"
        />
        <span className="text-blue-500">Textgram</span>
      </div>
          </h1>
        </div>
        <div className="flex flex-col items-center mt-4">
          <img
            src={user.profilePic || 'default-profile-pic.jpg'}
            alt="Profile"
            className="w-40 h-40 rounded-full mb-4"
          />
          <input 
            type="file" 
            id="profilePicInput" 
            accept="image/*" 
            onChange={handleProfilePicChange} 
            className="hidden"
          />
          <label 
            htmlFor="profilePicInput" 
            className="cursor-pointer relative flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-full"
          >
            <IoCamera className="w-8 h-8" />
            <span className="sr-only">Choose Image</span> 
          </label>
          <button 
            onClick={handleUpdateProfile} 
            className="mt-2 p-2 bg-blue-500 text-white rounded"
          >
            Update Profile
          </button>
          <h2 className="text-2xl font-semibold text-center text-gray-300 mb-2">{user.fullName}</h2>
          <p className="text-white">@{user.userName}</p>
          {user.email && <p className="text-gray-600">{user.email}</p>} 
        </div>
        <IoPlaySkipBackOutline 
          onClick={handleBackToHome} 
          className="text-2xl cursor-pointer w-6 h-6" 
        /> 
      </div>
    </div>
  );
};

export default ProfilePage;

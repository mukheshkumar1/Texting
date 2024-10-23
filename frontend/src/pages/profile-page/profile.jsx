import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoPlaySkipBackOutline, IoCamera } from 'react-icons/io5';
import { useAuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import CropImageModal from '../../utils/cropper/cropImageModal'; // Import the cropping modal

const ProfilePage = () => {
  const { authUser } = useAuthContext();
  const [user, setUser] = useState({
    fullName: '',
    userName: '',
    email: '',
    profilePic: '',
    gender: '', // Add gender for default picture logic
  });
  const [newProfilePic, setNewProfilePic] = useState(null); // Temp image preview
  const [showCropModal, setShowCropModal] = useState(false); // Control crop modal
  const [showOptions, setShowOptions] = useState(false); // Control options menu
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      setUser({
        fullName: authUser.fullName,
        userName: authUser.userName,
        email: authUser.email,
        profilePic: authUser.profilePic,
        gender: authUser.gender, // Set gender from authUser
      });
    }
  }, [authUser]);

  const handleBackToHome = () => navigate('/');

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewProfilePic(imageUrl);
      setShowCropModal(true); // Show the cropping modal
    }
  };

  const handleCrop = (croppedImage) => {
    setNewProfilePic(URL.createObjectURL(croppedImage)); // Update profile picture with cropped image
    setShowCropModal(false); // Close the crop modal
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

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      setUser({
        fullName: data.fullName,
        userName: data.userName,
        email: data.email,
        profilePic: data.profilePic,
        gender: data.gender, // Ensure gender is set
      });

      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile. Please try again.');
    }
  };

  const handleDeleteProfilePic = async () => {
    try {
      const res = await fetch("/api/auth/updateprofile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authtoken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deleteProfilePic: 'true' }), // Send delete request
      });
  
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  
      const data = await res.json();
      setUser({
        fullName: data.fullName,
        userName: data.userName,
        email: data.email,
        profilePic: data.profilePic, // Should now reflect the default picture
        gender: data.gender,
      });
  
      toast.success('Profile picture deleted successfully!');
      setShowOptions(false); // Close options menu
    } catch (error) {
      console.error('Error deleting profile picture:', error);
      toast.error('Error deleting profile picture. Please try again.');
    }
  };

  const toggleOptionsMenu = () => {
    setShowOptions((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-center text-gray-300">
            Profile
            <div className="flex items-center justify-center mt-2">
              <img src="/logo1.png" alt="Logo" className="w-8 h-8 mr-2" />
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
          <div className="relative">
            <label
              className="cursor-pointer relative flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-full"
              onClick={toggleOptionsMenu}
            >
              <IoCamera className="w-8 h-8" />
              <span className="sr-only">Choose Image</span>
            </label>
            {showOptions && (
              <div className="absolute z-10 mt-2 w-40 bg-white rounded shadow-lg">
                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                  onClick={() => {
                    setShowOptions(false);
                    document.getElementById('profilePicInput').click();
                  }}
                >
                  Update Picture
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                  onClick={handleDeleteProfilePic}
                >
                  Delete Picture
                </button>
              </div>
            )}
          </div>
          <input
            type="file"
            id="profilePicInput"
            accept="image/*"
            onChange={handleProfilePicChange}
            className="hidden"
          />
          <button
            onClick={handleUpdateProfile}
            className="mt-2 p-2 bg-blue-500 text-white rounded"
          >
            Update Profile
          </button>
          <h2 className="text-2xl font-semibold text-center text-gray-300 mb-2">
            {user.fullName}
          </h2>
          <p className="text-white">@{user.userName}</p>
          {user.email && <p className="text-gray-600">{user.email}</p>}
        </div>
        <IoPlaySkipBackOutline
          onClick={handleBackToHome}
          title="home"
          className="text-2xl cursor-pointer w-6 h-6"
        />
      </div>

      {showCropModal && (
        <CropImageModal
          imageSrc={newProfilePic}
          onCancel={() => setShowCropModal(false)}
          onCrop={handleCrop}
        />
      )}
    </div>
  );
};

export default ProfilePage;

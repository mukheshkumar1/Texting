import { useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";

const ProfileButton = ({ title = "Profile" }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile'); // Navigate to the profile page
  };

  return (
    <button
      title={title}
      className="p-2 rounded hover:bg-blue-600 hover:text-white transition-colors duration-300 flex items-center"
      onClick={handleProfileClick}
    >
      <CgProfile className="w-10 h-10 rounded-full" />
    </button>
  );
};

export default ProfileButton;

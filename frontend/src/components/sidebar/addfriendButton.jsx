import { useNavigate } from 'react-router-dom';
import { FaUserPlus } from "react-icons/fa"; // Add icon from react-icons

const AddFriendsButton = ({ title = "Add Friends" }) => {
  const navigate = useNavigate();

  const handleAddFriendsClick = () => {
    navigate('/sendrequest'); // Navigate to the add friends page
  };

  return (
    <button
      title={title}
      className="p-2 rounded hover:bg-blue-600 hover:text-white transition-colors duration-300 flex items-center relative"
      onClick={handleAddFriendsClick}
    >
      <FaUserPlus className="w-10 h-10" />
      {/* Optional badge for new friend requests or suggestions */}
      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-500 rounded-full">
        5
      </span>
    </button>
  );
};

export default AddFriendsButton;

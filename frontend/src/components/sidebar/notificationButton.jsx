import { useNavigate } from 'react-router-dom';
import { IoMdNotificationsOutline } from "react-icons/io"; // Notification icon from react-icons

const NotificationButton = ({ title = "Notifications" }) => {
  const navigate = useNavigate();

  const handleNotificationClick = () => {
    navigate('/notifications'); // Navigate to the notifications page
  };

  return (
    <button
      title={title}
      className="p-2 rounded hover:bg-blue-600 hover:text-white transition-colors duration-300 flex items-center relative"
      onClick={handleNotificationClick}
    >
      <IoMdNotificationsOutline className="w-10 h-10" />
      {/* Optional badge for unread notifications */}
      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-500 rounded-full">
        3
      </span>
    </button>
  );
};

export default NotificationButton;

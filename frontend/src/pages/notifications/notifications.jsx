import React from 'react';
import { useNavigate } from 'react-router-dom';
import useNotification from '../../hooks/useNotifications';
import useFriendRequestActions from '../../hooks/useFriendRequestActions'; // Import the hook

const Notifications = () => {
  const navigate = useNavigate();
  const { notifications, loading: notificationsLoading } = useNotification();
  const { handleAccept, handleReject, loading: actionLoading } = useFriendRequestActions();

  return (
    <div className="flex flex-col h-screen rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <div className="p-4 w-full flex-1">
        <h2 className="text-xl font-bold mb-4">Friend Requests</h2>

        {notificationsLoading ? (
          <p>Loading notifications...</p>
        ) : !Array.isArray(notifications) ? (
          <p>Error: Notifications data is not valid.</p>
        ) : notifications.length === 0 ? (
          <p>No new friend requests.</p>
        ) : (
          <ul>
            {notifications.map((notification) => (
              <li key={notification._id} className="border p-3 mb-2 rounded">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={notification.senderId.profilePic || '/default-profile.png'}
                      alt="Profile"
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    <span>{notification.senderId.fullName}</span>
                  </div>
                  <div>
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                      onClick={() => handleAccept(notification._id)}
                      disabled={actionLoading}
                    >
                      {actionLoading ? 'Processing...' : 'Accept'}
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleReject(notification._id)}
                      disabled={actionLoading}
                    >
                      {actionLoading ? 'Processing...' : 'Reject'}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="p-4">
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded w-full" 
          onClick={() => navigate('/')}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Notifications;

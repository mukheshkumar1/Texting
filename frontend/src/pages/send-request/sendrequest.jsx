import React, { useState, useEffect } from 'react';
import useSendRequest from '../../hooks/useSendRequest';
import useDeleteRequest from '../../hooks/useDeleteRequest'; // Import the delete request hook
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddFriends = () => {
  const { sendRequest, loading: sendingRequestLoading, error: sendRequestError } = useSendRequest();
  const { deleteRequest, loading: deletingRequestLoading, error: deleteRequestError } = useDeleteRequest();
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        // Replace with your API endpoint
        const response = await axios.get('/api/users');
        setFriendsList(response.data);
      } catch (err) {
        console.error('Failed to fetch friends:', err);
      }
    };

    fetchFriends();
  }, []);

  return (
    <div className="flex flex-col h-screen rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <div className="p-4 w-full">
        <h2 className="text-2xl font-bold text-center text-gray-300 mb-4">Add Friends</h2>

        {sendRequestError && <p className="text-red-500">{sendRequestError}</p>}
        {deleteRequestError && <p className="text-red-500">{deleteRequestError}</p>}

        {sendingRequestLoading || deletingRequestLoading ? (
          <span className="loading loading-spinner mx-auto"></span>
        ) : !Array.isArray(friendsList) ? (
          <p>Error: Friends list data is not valid.</p>
        ) : friendsList.length === 0 ? (
          <p>No users available to add.</p>
        ) : (
          <ul className="space-y-2 h-64 overflow-y-auto">
            {friendsList.map((friend) => ( // Display all friends
              <li key={friend._id} className="flex justify-between items-center border p-3 rounded bg-gray-500">
                <div className="flex items-center">
                  <img
                    src={friend.profilePic || '/default-profile.png'}
                    alt={`${friend.fullName}'s profile`}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <span className="text-gray-200">{friend.fullName}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    className={`bg-blue-700 text-white px-3 py-1 rounded ${sendingRequestLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => sendRequest(friend._id)}
                    disabled={sendingRequestLoading}
                  >
                    {sendingRequestLoading ? <span className="loading loading-spinner"></span> : 'Add Friend'}
                  </button>
                  <button
                    className={`bg-red-700 text-white px-3 py-1 rounded ${deletingRequestLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => deleteRequest(friend._id)} // Assuming friend's ID is the request ID for simplicity
                    disabled={deletingRequestLoading}
                  >
                    {deletingRequestLoading ? <span className="loading loading-spinner"></span> : 'Delete Request'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        
        {/* Back to Home link */}
        <Link to='/' className="text-sm text-white hover:underline hover:text-blue-400 mt-4 inline-block text-center">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default AddFriends;

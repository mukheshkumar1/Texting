import { useState } from 'react'; 
import toast from 'react-hot-toast';
import { useAuthContext } from '../Context/AuthContext'; // Ensure you are using your authentication context

const useSendRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Track error state
  const { authUser } = useAuthContext(); // Assuming authUser contains the current user and token

  const sendRequest = async (receiverId) => {
    // Input validation: ensure receiverId exists
    if (!receiverId) {
      toast.error('Invalid user selection.');
      return;
    }

    setLoading(true);
    setError(null); // Clear any previous error

    try {
      // Retrieve token from authUser (or fallback to localStorage)
      const token = authUser?.token || localStorage.getItem('chat-token');

      // **Debugging Logs:**
      console.log('Token:', token); // Check if token is present
      console.log('Receiver ID:', receiverId); // Verify receiver ID passed correctly
      console.log('Auth User ID:', authUser._id); // Log sender ID for extra debugging

      const res = await fetch(`/api/friend-requests/${receiverId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Attach token correctly
        },
        body: JSON.stringify({ senderId: authUser._id }), // Include sender's ID
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      toast.success('Friend request sent successfully!');
    } catch (error) {
      console.error('Request Error:', error); // Log any request error
      setError(error.message || 'Failed to send friend request.');
      toast.error(error.message || 'Failed to send friend request.');
    } finally {
      setLoading(false); // Ensure loading is reset
    }
  };

  return { sendRequest, loading, error }; // Return error in case the caller needs it
};

export default useSendRequest;

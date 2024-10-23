import { useState } from 'react'; 
import toast from 'react-hot-toast';
import { useAuthContext } from '../Context/AuthContext'; // Ensure you are using your authentication context

const useDeleteRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Track error state
  const { authUser } = useAuthContext(); // Assuming authUser contains the current user and token

  const deleteRequest = async (requestId) => {
    // Input validation: ensure requestId exists
    if (!requestId) {
      toast.error('Invalid request selection.');
      return;
    }

    setLoading(true);
    setError(null); // Clear any previous error

    try {
      // Retrieve token from authUser (or fallback to localStorage)
      const token = authUser?.token || localStorage.getItem('chat-token');

      const res = await fetch(`/api/friend-requests/delete/${requestId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Attach token correctly
        },
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      toast.success('Friend request deleted successfully!');
    } catch (error) {
      console.error('Request Error:', error); // Log any request error
      setError(error.message || 'Failed to delete friend request.');
      toast.error(error.message || 'Failed to delete friend request.');
    } finally {
      setLoading(false); // Ensure loading is reset
    }
  };

  return { deleteRequest, loading, error }; // Return error in case the caller needs it
};

export default useDeleteRequest;

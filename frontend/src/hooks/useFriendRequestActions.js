import { useState } from 'react';
import { toast } from 'react-toastify';

const useFriendRequestActions = () => {
  const [loading, setLoading] = useState(false);

  const handleAccept = async (notificationId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('chat-token'); // Retrieve token

      const response = await fetch(`/api/friend-requests/accept/${notificationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to accept request.');
      }

      toast.success('Friend request accepted!');
    } catch (error) {
      console.error('Accept Error:', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (notificationId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('chat-token'); // Retrieve token

      const response = await fetch(`/api/friend-requests/reject/${notificationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to reject request.');
      }

      toast.success('Friend request rejected!');
    } catch (error) {
      console.error('Reject Error:', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleAccept, handleReject, loading };
};

export default useFriendRequestActions;

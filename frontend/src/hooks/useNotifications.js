import { useState, useEffect } from 'react';
import axios from 'axios';

const useNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/friend-requests/pending');
        setNotifications(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch notifications', error);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return { notifications, loading };
};

export default useNotification;

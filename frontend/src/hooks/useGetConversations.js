// src/hooks/useGetConversations.js
import { useEffect, useState } from 'react';
import axiosInstance from '../Context/axiosinstance.js';

const useGetConversations = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axiosInstance.get('/friend-requests');
        setConversations(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  return { conversations, loading, error };
};

export default useGetConversations;

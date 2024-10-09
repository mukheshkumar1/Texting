import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { setMessages, selectedConversation } = useConversation();
  const [messages, setLocalMessages] = useState([]); // Initialize with empty array

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        if (!selectedConversation?._id) return; // Exit if no conversation ID

        const res = await fetch(`/api/messages/${selectedConversation._id}`);
        const data = await res.json();

        if (data.error) throw new Error(data.error);

        // Ensure data is an array before setting
        const validMessages = Array.isArray(data) ? data : [];
        setLocalMessages(validMessages); // Set local state
        setMessages(validMessages); // Set global state
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { loading, messages }; // Return the messages
};

export default useGetMessages;

import { useEffect } from "react";
import { useSocketContext } from "../Context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { setMessages } = useConversation();

  useEffect(() => {
    // Listen for new messages
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;

      // Play notification sound
      const sound = new Audio(notificationSound);
      sound.play();

      // Update messages using functional update to ensure we have the latest state
      setMessages(newMessage); // Pass single message directly
    });

    // Clean up the listener when the component is unmounted
    return () => socket?.off("newMessage");
  }, [socket, setMessages]);
};

export default useListenMessages;

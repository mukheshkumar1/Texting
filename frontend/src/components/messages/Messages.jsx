import { useEffect, useRef, useState } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message";
import MessageSkeleton from "../../skeletons/MessageSkeleton";
import useListenMessages from "../../hooks/useListenMessages";
import useConversation from "../../zustand/useConversation";
import { formatChatDate, isSameDay } from "../../utils/date";

const Messages = () => {
  const { messages, loading } = useGetMessages(); // Fetch initial messages
  useListenMessages(); // Listen for real-time updates
  const lastMessageRef = useRef();
  const { messages: storedMessages = [] } = useConversation(); // Default to empty array if undefined

  // State to check if the user is at the bottom of the messages
  const [isAtBottom, setIsAtBottom] = useState(true);

  // Scroll to the last message if the user is at the bottom
  useEffect(() => {
    if (isAtBottom) {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [storedMessages, isAtBottom]);

  // Handle scroll event to check if user is at the bottom
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 1); // Adjust for precision
  };

  // Function to get the date label
  const getDateLabel = (date) => {
    const messageDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    
    // Compare dates and return appropriate label
    if (isSameDay(today, messageDate)) {
      return "Today";
    } else if (isSameDay(yesterday, messageDate)) {
      return "Yesterday";
    } else {
      return formatChatDate(messageDate); // Format the date normally for other dates
    }
  };

  // Log storedMessages to ensure it's properly updating
  useEffect(() => {
    console.log("storedMessages:", storedMessages);
  }, [storedMessages]);

  return (
    <div
      className='px-4 flex-1 overflow-auto'
      onScroll={handleScroll} // Add scroll event listener
    >
      {!loading && Array.isArray(storedMessages) && storedMessages.length > 0 &&
        storedMessages.map((message, index) => {
          const showDateHeader = index === 0 || 
            !isSameDay(storedMessages[index - 1]?.createdAt, message.createdAt);
          
          // Ensure that each key is unique
          return (
            <div key={`${message._id}-${index}`}>
              {showDateHeader && (
                <div className="text-sm bg-gray-200 p-1 rounded-full inline-block align-center mt-4 text-center">
                  {getDateLabel(message.createdAt)} {/* Display the date label */}
                </div>
              )}
              <Message message={message} />
            </div>
          );
        })
      }

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && Array.isArray(storedMessages) && storedMessages.length === 0 && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}

      <div ref={lastMessageRef}></div>
    </div>
  );
};

export default Messages;

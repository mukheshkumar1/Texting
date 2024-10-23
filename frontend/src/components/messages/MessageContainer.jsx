import { useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../Context/AuthContext";
import { useSocketContext } from "../../Context/SocketContext";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { authUser } = useAuthContext();
  const { onlineUsers, socket } = useSocketContext();
  const [isOnline, setIsOnline] = useState(false);

  // Handle unmounting
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  // Check if the participant is online
  useEffect(() => {
    if (selectedConversation) {
      const participantId = selectedConversation.participants.find(
        (p) => p._id !== authUser._id
      )?._id;

      setIsOnline(onlineUsers.includes(participantId));
    }
  }, [selectedConversation, onlineUsers, authUser]);

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2 flex items-center gap-2">
            <div className={`avatar ${isOnline ? "online" : ""}`}>
              <div className="w-10 rounded-full">
                <img
                  src={
                    selectedConversation.participants.find(
                      (p) => p._id !== authUser._id
                    )?.profilePic || "/default-profile.png"
                  }
                  alt="User avatar"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <span className="label-text">To</span>{" "}
            <span className="text-gray-900 font-bold">
              {
                selectedConversation.participants.find(
                  (p) => p._id !== authUser._id
                )?.fullName
              }
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

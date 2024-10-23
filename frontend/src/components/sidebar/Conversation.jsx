import React from 'react';
import { useNavigate } from 'react-router-dom';
import useConversation from '../../zustand/useConversation'; // Zustand store for state management
import { useSocketContext } from '../../Context/SocketContext'; // Context for socket connection

const Conversation = ({ conversation, lastIdx, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const navigate = useNavigate();

  const isSelected = selectedConversation?._id === conversation._id;

  const handleAvatarClick = (profilePic) => {
    navigate(`/profile-picture/${encodeURIComponent(profilePic)}`);
  };

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
          ${isSelected ? 'bg-sky-500' : ''}
        `}
        onClick={() => setSelectedConversation(conversation)}
      >
        {conversation.participants.map((participant) => {
          const isOnline = onlineUsers.includes(participant._id);

          return (
            <div key={participant._id} className="flex items-center gap-2">
              {/* Avatar Section */}
              <div
                className={`avatar ${isOnline ? 'online' : ''}`}
                onClick={() => handleAvatarClick(participant.profilePic)}
              >
                <div className="w-12 rounded-full">
                  <img
                    src={participant.profilePic || '/default-profile.png'}
                    alt={`${participant.fullName}'s avatar`}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              {/* Participant Name and Emoji */}
              <div className="flex flex-col flex-1">
                <div className="flex gap-3 justify-between">
                  <p className="font-bold text-gray-200">
                    {participant.fullName}
                  </p>
                  <span className="text-x1">{emoji}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;

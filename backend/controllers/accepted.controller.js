import User from "../models/user.model.js";
import FriendRequest from "../models/friendrequest.model.js";
import Conversation from "../models/conversation.model.js";

export const getAcceptedConversations = async (req, res) => {
  const userId = req.user._id;

  try {
    // 1. Fetch accepted friend requests where the logged-in user is either the sender or receiver
    const acceptedRequests = await FriendRequest.find({
      $or: [
        { senderId: userId, status: 'accepted' },
        { receiverId: userId, status: 'accepted' }
      ]
    });

    // 2. Extract the IDs of friends from accepted requests
    const acceptedFriendIds = acceptedRequests.map((request) =>
      request.senderId.toString() === userId.toString()
        ? request.receiverId
        : request.senderId
    );

    // 3. Fetch details of accepted friends (excluding the current user)
    const acceptedFriends = await User.find({
      _id: { $in: acceptedFriendIds }
    }).select("fullName profilePic");

    // Create a map for quick access to friends' details
    const acceptedFriendsMap = acceptedFriends.reduce((map, friend) => {
      map[friend._id.toString()] = friend;
      return map;
    }, {});

    // 4. Fetch conversations where the logged-in user is a participant
    const conversations = await Conversation.find({
      participants: userId,
    }).populate("participants", "fullName profilePic");

    // 5. Filter and map conversations to only include participants who are accepted friends
    const filteredConversations = conversations.map((conversation) => {
      const participantsDetails = conversation.participants
        .filter((participant) => participant._id.toString() !== userId.toString()) // Exclude logged-in user
        .map((participant) => acceptedFriendsMap[participant._id.toString()]) // Get friend details
        .filter(Boolean); // Remove null entries

      return participantsDetails.length > 0
        ? {
            ...conversation.toObject(), // Convert Mongoose document to plain object
            participants: participantsDetails, // Update participants
          }
        : null; // Return null if no valid participants
    }).filter(Boolean); // Remove null conversations

    // 6. Send the filtered conversations as the response
    res.status(200).json(filteredConversations);
  } catch (error) {
    console.error("Error fetching accepted conversations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

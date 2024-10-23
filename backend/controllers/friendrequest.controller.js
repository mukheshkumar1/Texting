import FriendRequest from "../models/friendrequest.model.js";
import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";

// Send a friend request
export const sendFriendRequest = async (req, res) => {
  const { receiverId } = req.params;
  const senderId = req.user._id;

  try {
    const existingRequest = await FriendRequest.findOne({ senderId, receiverId });

    if (existingRequest) {
      return res.status(400).json({ error: "Friend request already sent" });
    }

    const receiverExists = await User.findById(receiverId);
    if (!receiverExists) {
      return res.status(404).json({ error: "Receiver not found" });
    }

    const newRequest = new FriendRequest({ senderId, receiverId });
    await newRequest.save();

    res.status(201).json({ message: "Friend request sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a friend request
export const deleteFriendRequest = async (req, res) => {
  const { requestId } = req.params; // Get the requestId from the request parameters
  const userId = req.user._id; // Get the logged-in user's ID

  try {
    // Find the friend request by ID and check if the logged-in user is the sender or receiver
    const request = await FriendRequest.findById(requestId);
    
    if (!request) {
      return res.status(404).json({ error: "Friend request not found" });
    }

    // Ensure that the user trying to delete the request is either the sender or receiver
    if (request.senderId.toString() !== userId.toString() && request.receiverId.toString() !== userId.toString()) {
      return res.status(403).json({ error: "You are not authorized to delete this request" });
    }

    // Delete the friend request
    await FriendRequest.findByIdAndDelete(requestId);

    res.status(200).json({ message: "Friend request deleted successfully" });
  } catch (error) {
    console.error("Error in deleteFriendRequest:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Accept a friend request
export const acceptFriendRequest = async (req, res) => {
  const { requestId } = req.params;

  try {
    const request = await FriendRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ error: "Friend request not found" });
    }

    // Update request status to "accepted"
    request.status = "accepted";
    await request.save();

    // Create or find the conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [request.senderId, request.receiverId] },
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [request.senderId, request.receiverId],
      });
      await conversation.save();
    }

    res.status(200).json({ message: "Friend request accepted and conversation created." });
  } catch (error) {
    console.error("Error in acceptFriendRequest:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Reject a friend request
export const rejectFriendRequest = async (req, res) => {
  const { requestId } = req.params;

  try {
    const request = await FriendRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ error: "Friend request not found" });
    }

    request.status = "rejected";
    await request.save();

    res.status(200).json({ message: "Friend request rejected" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get pending friend requests for a user
export const getPendingRequests = async (req, res) => {
  const userId = req.user._id;

  try {
    const requests = await FriendRequest.find({
      receiverId: userId,
      status: 'pending',
    }).populate('senderId', 'fullName userName profilePic');

    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// import Conversation from "../models/conversation.model.js";
// import Message from "../models/message.model.js";
// import { getReceiverSocketId, io } from "../socket/socket.js"

// export const sendMessage =async (req,res)=>{
//    try {
//     const {message} =req.body;
//     const {id: receiverId} = req.params;
//     const senderId = req.user._id;

//     let conversation=await Conversation.findOne({
//         participants:{$all: [senderId,receiverId]}
//     })

//     if(!conversation){
//         conversation= await Conversation.create({
//             participants:[senderId,receiverId],
//         })
//     }

//     const newMessage=new Message({
//         senderId,
//         receiverId,
//         message,
//     })

//     if (newMessage){
//         conversation.messages.push(newMessage._id)
//     }

   
     
//     // await conversation.save();
//     // await newMessage.save();
//     await Promise.all([conversation.save(), newMessage.save()])
//       //SOCKETIO functionality 
//     const receiverSocketId = getReceiverSocketId(receiverId);
// 		if (receiverSocketId) {
// 			// io.to(<socket_id>).emit() used to send events to specific client
// 			io.to(receiverSocketId).emit("newMessage", newMessage);
// 		}


//     res.status(201).json(newMessage)
//    } catch (error) {
//     console.log("Error in sendMessage Controller: ",error.message)
//     res.status(500).json({error:"Internal Server Error"})
    
//    }
// }

// export const getMessage =async(req,res) =>{
//     try {

//         const{id:userToChatId}= req.params;
//         const senderId = req.user._id;

//         const conversation= await Conversation.findOne({
//             participants:{$all:[senderId,userToChatId]},
//         }).populate("messages")

//         if(!conversation) return res.status(200).json([])

//         const messages = conversation.messages

//         res.status(200).json(messages)
        
//     } catch (error) {
//         console.log("Error in getMessage Controller: ",error.message)
//     res.status(500).json({error:"Internal Server Error"})
        
//     }
// }

import mongoose from "mongoose";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import FriendRequest from "../models/friendrequest.model.js"; 
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const receiverId = new mongoose.Types.ObjectId(req.params.id); // Recipient's ID
    const senderId = new mongoose.Types.ObjectId(req.user._id); // Sender's ID

    // Check if users are friends or request has been accepted
    const isFriend = await FriendRequest.findOne({
      $or: [
        { senderId, receiverId, status: "accepted" },
        { senderId: receiverId, receiverId: senderId, status: "accepted" },
      ],
    });

    if (!isFriend) {
      return res.status(403).json({ error: "You can only message accepted friends." });
    }

    // Check for existing conversation or create a new one
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, receiverId],
      });
      await conversation.save();
    }

    // Create and save the new message
    const newMessage = new Message({ senderId, receiverId, message });
    conversation.messages.push(newMessage._id);
    await Promise.all([newMessage.save(), conversation.save()]);

    // Emit the message in real-time if the receiver is online
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage Controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get messages between two users
export const getMessage = async (req, res) => {
    try {
      const userToChatId = new mongoose.Types.ObjectId(req.params.id); // Other user's ID
      const senderId = new mongoose.Types.ObjectId(req.user._id); // Current user ID
  
      // Check if the users are friends (i.e., friend request has been accepted)
      const isFriend = await FriendRequest.findOne({
        $or: [
          { senderId, receiverId: userToChatId, status: "accepted" },
          { senderId: userToChatId, receiverId: senderId, status: "accepted" },
        ],
      });
  
      if (!isFriend) {
        return res.status(403).json({ error: "You can only access messages with accepted friends." });
      }
  
      // Find the conversation between these users
      const conversation = await Conversation.findOne({
        participants: { $all: [senderId, userToChatId] },
      }).populate("messages"); // Populate messages to get detailed message data
  
      if (!conversation) {
        return res.status(200).json([]); // Return an empty array if no conversation found
      }
  
      res.status(200).json(conversation.messages); // Return the messages from the conversation
    } catch (error) {
      console.error("Error in getMessage Controller:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
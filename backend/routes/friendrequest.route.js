import express from 'express';
import {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getPendingRequests,
  deleteFriendRequest,
} from '../controllers/friendrequest.controller.js';
import protectRoute from '../middleware/protectRoute.js';
import { getAcceptedConversations } from '../controllers/accepted.controller.js';

const router = express.Router();

// Define routes for friend requests
router.post('/:receiverId',protectRoute , sendFriendRequest); // Send a friend request
router.patch('/accept/:requestId',protectRoute , acceptFriendRequest); // Accept a friend request
router.patch('/reject/:requestId',protectRoute , rejectFriendRequest); // Reject a friend request
router.get('/pending', protectRoute, getPendingRequests); // Get pending requests
router.delete('/delete/:requestId',protectRoute, deleteFriendRequest);
router.get('/', protectRoute, getAcceptedConversations);

export default router;

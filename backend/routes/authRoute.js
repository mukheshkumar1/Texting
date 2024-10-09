import express from "express";
import { forgotPassword, login, logout, resetPassword, signup, updateProfile } from "../controllers/auth.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import { upload } from "../utils/cloudinary.js";

const router= express.Router();

router.post("/signup",signup)

router.post("/login",login)

router.post("/logout",logout)

router.post("/forgot-password", forgotPassword)

router.post("/reset-password", resetPassword)
  
router.put('/updateprofile', protectRoute, upload.single('profilePic'), updateProfile);

export default router;

import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import crypto from "crypto";
import multer from "multer";
import { cloudinary } from "../utils/cloudinary.js"; // Update the path to where your cloudinary.js file is located


import sendEmail from "../utils/sendEmail.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup= async (req,res)=>{
   try {
    const{fullName,userName,email,password,confirmpassword,gender} = req.body

    if(password!==confirmpassword) {
        return res.status(400).json({error:"Passwords Don't match"})
    }
    const user= await User.findOne({userName});

    if(user){
        return res.status(400).json({error:"UserName already Exists"})
    }

    //Hashed Password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword= await bcrypt.hash(password, salt);

    const boyProfilePic =`https://avatar.iran.liara.run/public/boy?username=${userName}`
    const girlProfilePic =`https://avatar.iran.liara.run/public/girl?username=${userName}`
    const newUser= new User({
        fullName,
        userName,
        email,
        password: hashedPassword,
        gender,
        profilePic: gender === "male"? boyProfilePic: girlProfilePic
    })
     
    if(newUser){
        //Generate JWT Token
        generateTokenAndSetCookie(newUser._id,res)
        await newUser.save()

    res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        profilePic: newUser.profilePic
    })
    }else{
        res.status(400).json({error:"Invalid User Data"})
    }
   } catch (error) {
    console.log("Error in signup controller",error.message)
    res.status(500).json({error:"Internal Server Error"})
    
   }
}

export const login= async(req,res)=>{
    try {
        const{userName,password}= req.body
        const user = await User.findOne({userName})
        const isPasswordCorrect = await bcrypt.compare(password,user?.password||"")

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid UserName or Paasword"})
        }
        generateTokenAndSetCookie(user._id,res)

    res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        userName: user.userName,
        profilePic: user.profilePic
    })
    } catch (error) {
        console.log("Error in login controller",error.message)
        res.status(500).json({error:"Internal Server Error"})
        
    }
}

export const logout= (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logged out Successfully"})
        
    } catch (error) {
        console.log("Error in logout controller",error.message)
        res.status(500).json({error:"Internal Server Error"})
        
    }
    
}

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ error: "User with this email does not exist" })
        }

        const resetToken = crypto.randomBytes(32).toString('hex')
        user.resetPasswordToken = resetToken
        user.resetPasswordExpire = Date.now() + 3600000; // Token expires in 1 hour

        await user.save()

        const resetUrl = `https://textogram-lo7b.onrender.com/reset-password/${resetToken}`

        const message = `You requested a password reset. Click this link to reset your password: ${resetUrl}`

        await sendEmail(user.email, 'Password Reset', message)

        res.status(200).json({ message: "Password reset email sent" })
    } catch (error) {
        console.log("Error in forgotPassword controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { resetToken, newPassword, confirmPassword } = req.body

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" })
        }

        const user = await User.findOne({
          resetPasswordToken: resetToken,
          resetPasswordExpire: { $gt: Date.now() },
        });
      
        if (user) {
          // Update user's password and clear the reset token
          user.password = bcrypt.hashSync(newPassword)
          user.resetPasswordToken = undefined;
          user.resetPasswordExpire = undefined;
          await user.save();
      
          res.status(200).json({ message: 'Password reset successful' })
        } else {
          res.status(400).json({ message: 'Invalid or expired token' })
        }
    } catch (error) {
        console.log("Error in resetPassword controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
};




// Update Profile controller
export const updateProfile = async (req, res) => {
    try {
      let profilePic;
  
      // Check if the delete picture request is made
      if (req.body.deleteProfilePic === 'true') {
        console.log('Delete profile picture request received');
        const user = await User.findById(req.user._id);
  
        if (!user) {
          console.log('User not found');
          return res.status(404).json({ error: "User not found" });
        }
  
        // Set default profile picture based on gender
        profilePic =
          user.gender === "male"
            ? `https://avatar.iran.liara.run/public/boy?username=${user.userName}`
            : `https://avatar.iran.liara.run/public/girl?username=${user.userName}`;
  
        console.log('Default profile picture set:', profilePic);
  
        // Delete the old image from Cloudinary if it exists
        if (user.profilePic) {
          const publicId = user.profilePic.split('/').pop().split('.')[0]; // Extract public ID
          console.log('Deleting Cloudinary image with public ID:', publicId);
          await cloudinary.v2.uploader.destroy(publicId); // Delete the image from Cloudinary
        }
      } else if (req.file) {
        profilePic = req.file.path; // This should now point to the Cloudinary URL if using multer correctly
      } else {
        const user = await User.findById(req.user._id);
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
  
        profilePic =
          user.gender === "male"
            ? `https://avatar.iran.liara.run/public/boy?username=${user.userName}`
            : `https://avatar.iran.liara.run/public/girl?username=${user.userName}`;
      }
  
      const updateData = { profilePic };
  
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        updateData,
        { new: true }
      );
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
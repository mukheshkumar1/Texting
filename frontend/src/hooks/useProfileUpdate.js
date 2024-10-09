import { useState } from "react";
import toast from 'react-hot-toast';
import { useAuthContext } from "../Context/AuthContext";

const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const updateProfile = async ({ fullName, profilePic }) => {
    setLoading(true);
    try {
      // Add logic to update profile picture and fullName
      const res = await fetch("/api/users/update-profile", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ fullName, profilePic })
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      // Update auth user in local storage and context
      const authUser = JSON.parse(localStorage.getItem("chat-user"));
      authUser.fullName = fullName;
      authUser.profilePic = profilePic;
      localStorage.setItem("chat-user", JSON.stringify(authUser));
      setAuthUser(authUser);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateProfile };
}

export default useUpdateProfile;

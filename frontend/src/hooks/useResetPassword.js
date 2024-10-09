import { useState } from "react";
import toast from 'react-hot-toast';

const useResetPassword = () => {
  const [loading, setLoading] = useState(false);

  const resetPassword = async ({ resetToken, newPassword, confirmPassword }) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetToken, newPassword, confirmPassword })
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, resetPassword };
};

export default useResetPassword;

import { useState } from 'react';
import toast from 'react-hot-toast';

const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const forgotPassword = async (email) => {
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      toast.success('Password reset email sent successfully');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, forgotPassword };
};

export default useForgotPassword;

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import useResetPassword from "../../hooks/useResetPassword";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();
  const { loading, resetPassword } = useResetPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    const success = await resetPassword({ resetToken: token, newPassword, confirmPassword });
    if (success) {
      toast.success("Password reset successfully");
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Reset Password
          <div className="flex items-center justify-center mt-2">
        <img
          src="/logo1.png"
          alt="Logo"
          className="w-8 h-8 mr-2"
        />
        <span className="text-blue-500">Textgram</span>
      </div>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">New Password</span>
            </label>
            <input 
              type="password" 
              placeholder="Enter New Password" 
              className="w-full input input-bordered h-10"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input 
              type="password" 
              placeholder="Confirm New Password" 
              className="w-full input input-bordered h-10"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <button 
              className="text-white bg-blue-700 hover:bg-green-800 btn btn-block btn-sm mt-2" 
              disabled={loading}
            >
              {loading ? <span className="loading loading-spinner"></span> : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

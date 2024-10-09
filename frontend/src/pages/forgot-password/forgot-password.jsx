import { useState } from "react";
import { Link } from "react-router-dom";
import useForgotPassword from "../../hooks/useForgotPassword";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const { loading, forgotPassword } = useForgotPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Forgot Password
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
              <span className="text-base label-text">Email</span>
            </label>
            <input 
              type="email" 
              placeholder="Enter Email" 
              className="w-full input input-bordered h-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <Link to='/login' className="text-sm text-white hover:underline hover:text-blue-400 mt-2 inline-block">
            Back to Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
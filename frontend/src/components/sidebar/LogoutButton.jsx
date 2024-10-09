import { BiLogOut } from 'react-icons/bi';
import useLogout from '../../hooks/useLogout';

const LogoutButton = ({ title = "Logout" }) => {
  const { loading, logout } = useLogout();

  return (
    <div className="mt-auto">
      {!loading ? (
        <button
          title={title}
          className="p-2 rounded hover:bg-red-600 hover:text-white transition-colors duration-300 flex items-center"
          onClick={logout}
        >
          <BiLogOut className="w-10 h-10 text-white cursor-pointer" />
        </button>
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};

export default LogoutButton;

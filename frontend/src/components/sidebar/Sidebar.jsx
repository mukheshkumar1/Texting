import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import ProfileButton from "./ProfileButton";
import NotificationButton from "./notificationButton";
import AddFriendsButton from "./addfriendButton";

const Sidebar = () => {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <div className="flex items-center justify-center mt-2">
        <img
          src="/logo1.png"
          alt="Logo"
          className="w-10 h-10 mr-2"
        />
        <span className="text-blue-500 size-100" >Textgram</span>
      </div>
      <SearchInput />
      <div className="divider px-3"></div>
      <Conversations />
      <div className="flex justify-between items-center mt-4">
        <LogoutButton title="Logout" />
        <AddFriendsButton title="Add friends"/>
        <NotificationButton title="Notifications"/>
        <ProfileButton title="Profile" />
      </div>
    </div>
  );
};

export default Sidebar;

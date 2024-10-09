// import { useState, useEffect } from 'react';
// import { useAuthContext } from '../Context/AuthContext';

// const useProfile = () => {
//   const { authUser } = useAuthContext();
//   const [user, setUser] = useState({
//     fullName: '',
//     userName: '',
//     email: '',
//     profilePic: '',
//   });
//   const [newProfilePic, setNewProfilePic] = useState(null); // State for the new profile picture

//   useEffect(() => {
//     if (authUser) {
//       setUser({
//         fullName: authUser.fullName,
//         userName: authUser.userName,
//         email: authUser.email,
//         profilePic: authUser.profilePic,
//       });
//     }
//   }, [authUser]);

//   const handleProfilePicChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setNewProfilePic(file);
//     }
//   };

//   const handleUpdateProfile = async () => {
//     try {
//       const formData = new FormData();
//       if (newProfilePic) formData.append('profilePic', newProfilePic);

//       const res = await fetch("/api/auth/updateprofile", {
//         method: "PUT",
//         body: formData,
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authtoken")}`, // Include authorization token if required
//         },
//       });

//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }

//       const data = await res.json();
//       setUser({
//         fullName: data.fullName,
//         userName: data.userName,
//         email: data.email,
//         profilePic: data.profilePic,
//       });
//     } catch (error) {
//       console.error('Error updating profile:', error);
//     }
//   };

//   return {
//     user,
//     handleProfilePicChange,
//     handleUpdateProfile,
//   };
// };

// export default useProfile;

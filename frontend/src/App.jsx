import { Navigate, Route, Routes } from 'react-router-dom'
import {Toaster} from "react-hot-toast"
import './App.css'
import Home from './pages/home/Home'
import Login from './pages/login/login'
import SignUp from './pages/signup/signup'
import { useAuthContext } from './Context/AuthContext'
import ForgotPassword from './pages/forgot-password/forgot-password'
import ResetPassword from './pages/reset-password/reset-password'
import ProfilePage from './pages/profile-page/profile'
import ProfilePicturePage from './pages/profile-page/userprofile'
import Conversation from './components/sidebar/Conversation'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const {authUser}=useAuthContext()
  return (
  <div className='p-4 h-screen flex items-center justify-center'>
   <Routes>
   <Route path='/' element={authUser ? <Home/> :<Navigate to={"/login"}/>}/>
   <Route path='/login' element={authUser ? <Navigate to="/"/>:<Login/>}/>
   <Route path='/signup' element={authUser ? <Navigate to="/"/>: <SignUp/>}/>
   <Route path="/forgot-password" element={<ForgotPassword/>} />
   <Route path="/reset-password/:token" element={<ResetPassword/>} />
   <Route path="/profile" element={authUser ?<ProfilePage/>: <Navigate to={"/"}/>}/>
   <Route path="/" element={<Conversation />} />
   <Route path="/profile-picture/:profilePicUrl" element={<ProfilePicturePage />} />
  

   </Routes>
   <Toaster/>
   <ToastContainer />
    </div>
  )

 
    
}
export default App

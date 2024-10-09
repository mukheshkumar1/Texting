import { useState } from "react"
import { Link } from "react-router-dom"
import useLogin from "../../hooks/useLogin"

const Login = () => {
  const [userName,setUserName]=useState("")
  const [password,setPassword]=useState("")

  const{loading,login}=useLogin()

   const handleSubmit= async (e) =>{
    e.preventDefault()
    await login(userName,password)
   }

  return (
    <div className="flex flex-co1 item-center justify-center min-w- 96 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <h1 className="text-3xl font-semibold text-center text-gray-300">
                Login
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
          <label className="label p-2">
            <span className="text-base label-text">User Name</span>
          </label>
          <input type="text" placeholder="Enter User Name" className="w-full input input-bordered h-10"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}/>
          <div>
          <label className="label p-2">
            <span className="text-base label-text">Password</span>

          </label>
          <input type="password" placeholder="Enter Password" className="w-full input input-bordered h-10"
           value={password}
           onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div>
          
          <div>
            <button className="text-white bg-blue-700 hover:bg-green-800 btn btn-block btn-sm mt-2 "
            disabled= {loading}
            >
              {loading ? <span className="loading loading-spinner"></span>:"Login"}
            </button>
          </div>
          <div className="flex justify-between mt-2">
      <Link to='/forgot-password' className="text-sm text-white hover:underline hover:text-blue-400 inline-block">
        Forgot Password?
      </Link>
      </div>
      <div className="flex justify-between mt-2">
      <Link to='/signup' className="text-sm text-white hover:underline hover:text-blue-400 inline-block">
        {"Don't"} Have an Account
      </Link>
    </div>
        </div>
          
           </form>
        </div>
        
     
      
    </div>
   
  )
}

export default Login


// const Login = () => {
//   return (
//     <div className="flex flex-co1 item-center justify-center min-w- 96 mx-auto">
//         <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
//             <h1 className="text-3xl font-semibold text-center text-gray-300">
             
//                 Login
//                 <span className="text-blue-500">Chat App</span>
//             </h1>
//         <form>
//           <label className="label p-2">
//             <span className="text-base label-text">User Name</span>
//           </label>
//           <input type="text" placeholder="Enter User Name" className="w-full input input-bordered h-10"/>
//           <div>
//           <label className="label p-2">
//             <span className="text-base label-text">Password</span>

//           </label>
//           <input type="password" placeholder="Enter Password" className="w-full input input-bordered h-10"/>
//         </div>
//         <div>
//           <a href="#" className="text-sm hover:underline hover:text-blue-400 mt-2 inline-block">
//             {"Don't"} Have an Account
//           </a>
//           <div>
//             <button className="text-white bg-blue-700 hover:bg-green-800 btn btn-block btn-sm mt-2 ">Login</button>
//           </div>
//         </div>
          
//            </form>
//         </div>
        
     
      
//     </div>
   
//   )
// }

// export default Login

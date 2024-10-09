import { Link } from "react-router-dom"
import GenderCheckbox from "./GenderCheckbox"
import { useState } from "react"
import useSignup from "../../hooks/useSignup"

const SignUp = () => {

  const[inputs,setInputs]=useState({
    fullName:'',
    userName:'',
    email:'',
    password:'',
    confirmpassword:'',
    gender:''
  })

  const {loading,signup}= useSignup()

  const handleCheckboxChange=(gender)=>{
    setInputs({...inputs,gender})
  }
  const handleSubmit= async (e) => {
    e.preventDefault()
    await signup(inputs)
  }
  return (
    <div className="flex flex-co1 item-center justify-center min-w- 96 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <h1 className="text-3xl font-semibold text-center text-gray-300">
             
                SignUp
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
            <span className="text-base text-white label-text">Full Name</span>
          </label>
          <input type="text " placeholder="Enter Full Name" className="w-full input input-bordered h-10"
            value={inputs.fullName}
            onChange={(e)=> setInputs({...inputs,fullName:e.target.value})}
          />
          <div>
          <label className="label p-2">
            <span className="text-base text-white label-text">User Name</span>

          </label>
          <input type="text" placeholder="Enter User Name" className="w-full input input-bordered h-10"
             value={inputs.userName}
             onChange={(e)=> setInputs({...inputs,userName:e.target.value})}
          />
        </div>
        <div>
          <label className="label p-2">
            <span className="text-base text-white label-text">Email</span>

          </label>
          <input type="email" placeholder="Enter Email" className="w-full input input-bordered h-10"
          value={inputs.email}
          onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          />
        </div>
          <div>
          <label className="label p-2">
            <span className="text-base text-white label-text">Password</span>

          </label>
          <input type="password" placeholder="Enter Password" className="w-full input input-bordered h-10"
          value={inputs.password}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />
        </div>
        <div>
          <label className="label p-2">
            <span className="text-base text-white label-text">confirm Password</span>

          </label>
          <input type="password" placeholder="Confirm Password" className="w-full input input-bordered h-10"
          value={inputs.confirmpassword}
          onChange={(e) => setInputs({ ...inputs, confirmpassword: e.target.value })}
          />
        </div>
        <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender}/>
        <div>
        <label className="label p-2">
          
          <div>
            <button className="text-white bg-blue-700 hover:bg-green-800 btn btn-block btn-sm mt-2 "
            disabled={loading}
            >
              { loading ? <span className="loading loading-spinner"></span>: "Sign Up"}</button>

          </div>
          </label>
          <Link to='/login' className="text-sm text-white hover:underline hover:text-blue-400 mt-2 inline-block">
            Already Have an Account
          </Link>
        </div>
          
           </form>
        </div>
        
     
      
    </div>
   
  )
}

export default SignUp

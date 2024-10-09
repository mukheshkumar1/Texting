import { useState } from "react"
import toast from 'react-hot-toast'
import { useAuthContext } from "../Context/AuthContext"

const useSignup = () => {
  const[loading,setLoading]= useState(false)
  const{setAuthUser}=useAuthContext()

  const signup = async({fullName,userName,email,password,confirmpassword,gender})=>{
    const success = handleInputErrors({fullName,userName,email,password,confirmpassword,gender})
    if(!success) return;

    try {
      const res = await fetch("/api/auth/signup",{
        method: "POST",
        headers:{ "content-type":"application/json"},
        body: JSON.stringify({fullName,userName,email,password,confirmpassword,gender})
      })

      const data = await res.json()
      if(data.error){
        throw new Error(data.error)
      }
     //localStorage
     localStorage.setItem("chat-user",JSON.stringify(data))
     //context
     setAuthUser(data)
    } catch (error) {
      toast.error(error.message)
    } finally{
      setLoading(false)
    }

  }
    return {loading,signup}
}

export default useSignup

function handleInputErrors({fullName,userName,email,password,confirmpassword,gender}){
    if(!fullName ||!userName ||!email ||!password ||! confirmpassword||!gender){
        toast.error('please fill all the fields')
        return false
    }

    if(password !==confirmpassword){
        toast.error("Passwords don't Match")
        return false
    }
    
    if(password.length < 7){
        toast.error("Password must be atleast 7 characters")
        return false
    }

    return true
}

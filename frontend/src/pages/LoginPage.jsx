import React from "react";
import {useState} from "react"
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";

const LoginPage = () => {
  
  const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const {login,isLoggingIn} =useAuthStore()

  const handleLogin=(e)=>{
    e.preventDefault()
   login({email,password})

  }
  return <div className="h-screen w-full hero-bg">
     
    <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
    <Link to={"/"}>
      <img src="/netflix-logo.png" alt="logo" className="w-52"/>
    </Link>
    </header>
     <div className="flex flex-col justify-center items-center mt-20 mx-3 ">
        <div className="w-full max-w-md p-4 space-y-4 bg-black/60 rounded-lg shadow-lg">
            <h1 className="text-center text-white text-4xl font-bold my-3">Login</h1>
               <form className="space-y-4" onSubmit={handleLogin}>
         <section >
          <label htmlFor="email" className="text-lg font-medium text-gray-400 block">Email </label>
          <input type="email" placeholder="my@gmail.com" className="w-full px-2 py-3 mt-1 border border-gray-500 rounded-lg bg-transparent text-white text-lg
          focus:outline-none focus:ring" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
         </section>
         
         <section >
          <label htmlFor="password" className="text-lg font-medium text-gray-400 block">Password</label>
          <input type="password" placeholder= "******" className="w-full px-2 py-3 mt-1 border border-gray-500 rounded-lg bg-transparent text-white text-lg
          focus:outline-none focus:ring" id="password" value={password} onChange={(e)=> setPassword(e.target.value)} />
         </section>
         <button className="w-full py-2 bg-red-500 text-white font-semibold border rounded-md hover:bg-red-800 border-none">
       {isLoggingIn ? "Loading...." : "Login"}
         </button>
              </form>
              <div className="text-center text-white/70 text-2xl  ">
                  Don't have an acount ? {""} <Link to={'/signup'}className="hover:underline text-red-500">Sign Up</Link>
              </div>
        </div>
     
     </div>
  </div>;
};


export default LoginPage
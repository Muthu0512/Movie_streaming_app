import {React,useState} from 'react'
import {Eye,EyeOff} from "lucide-react"

const PasswordReveal = ({showPassword,setShowPassword}) => {
    
  return (
    <button  type="button" className="absolute top-[45%] translate-y-1/2 right-4   bg-red-800/50 hover:bg-red-800 px-1 rounded-md transition-colors duration-150"  onClick={()=>{
        setShowPassword(!showPassword)
    }}>{showPassword ? <Eye className='size-5'/>:<EyeOff className='size-5' />}</button>
  )
}

export default PasswordReveal
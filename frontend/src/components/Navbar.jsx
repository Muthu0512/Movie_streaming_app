import React from 'react'
import {Link } from "react-router-dom"
import {Search,LogOut,Menu} from "lucide-react"
import { useState } from 'react'
import {useAuthStore} from "../store/authUser.js"
import { useContentStore } from "../store/content.js";

const Navbar = () => {
    const [isMobileView,setIsMobileView] =useState(false)
    const {user,logout} = useAuthStore()

     function toogleMobileview(){
        setIsMobileView(!isMobileView)
    }
     const {contentType,setContentType}=useContentStore()
  
  return (
        
        <header className=' max-w-8xl mx-auto flex flex-wrap gap-2 justify-between items-center p-4 h-20  bg-black/ 80 text-white '>
            <div className='flex items-center gap-10 z-50'>
                <Link to="/">
                <img src="/netflix-logo.png" alt="netflix" className='w-32 sm:w-40' />
                </Link >

                {/**desktop nav */}
                <div className=' hidden sm:flex justify-center items-center gap-2'>
                    <Link to="/" className='font-light hover:underline' onClick={()=>setContentType("movie")} >
                    Movies
                    </Link>
                    <Link to="/" className='font-light hover:underline' onClick={()=>setContentType("tv")}>
                    TV shows
                    </Link>
                    <Link to="/history" className='font-light hover:underline'>
                    search history
                    </Link>
                    
                </div>
               
            </div>
             <div className='flex items-center justify-center gap-2 z-50 '>
                    <Link to={"/search"}>
                    <Search className='size-6 cursor-pointer'/>
                    </Link>
                    <img src={user.image} alt="Profile-pic" className='h-8 rounded'/>
                    
                    <LogOut className="size-6 cursor-pointer" onClick={logout}/>
                    <div className='sm:hidden '>
                    <Menu className="size-8 cursor-pointer" onClick={toogleMobileview}/>
                    </div>
                </div>

            {/**mobile nav */}

            {isMobileView && (<div className='sm:hidden flex flex-col justify-start w-full gap-2 mt-2  p-2 z-50 bg-black border rounded border-gray-400 '>
    <Link to="/" className='font-light hover:underline block'  onClick={toogleMobileview}>
                    Movies
                    </Link>
                    <Link to="/" className='font-light hover:underline block'  onClick={toogleMobileview}>
                    TV shows
                    </Link>
                    <Link to="/history" className='font-light hover:underline block'  onClick={toogleMobileview}>
                    search history
                    </Link>
                    
            </div>)}
            
        </header>
        
  
  )
}

export default Navbar
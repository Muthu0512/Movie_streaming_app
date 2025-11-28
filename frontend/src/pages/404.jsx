import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className='min-h-screen bg-cover bg-center w-full flex flex-col justify-center items-center text-white'
    style={{backgroundImage:`url("/404.png")`}}> 
    <header className='absolute top-0 left-0  px-6 py-4 bg-black w-full h-24 '>
    <Link to={'/'} >
    <img src={"/netflix-logo.png"} alt="netflix-logo" className="h-12  py-1" />
    </Link>
    </header>
    <main className='text-center z-10 error-page'>
        <h1 className='text-5xl font-semibold mb-10'>Lost your way ?</h1>
        <p className='mb-12 text-xl'>we can't find the page. you'll find lots to explore on the Home pages</p>
        <Link to={"/"} className='  bg-red-600 text-black font-bold text-xl px-4 py-2 rounded underline  '>Netflix Home</Link>
    </main>
    </div>
  )
}

export default NotFoundPage
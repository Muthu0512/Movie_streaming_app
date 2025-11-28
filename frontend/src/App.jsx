import { useEffect } from 'react'
import { Route,Routes,Navigate } from 'react-router-dom'
import LoginPage from "./pages/LoginPage.jsx"
import HomePage from "./pages/home/HomePage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"
import WatchPage from './pages/WatchPage.jsx'
import SearchPage from './pages/SearchPage.jsx'
import SearchHistoryPage from "./pages/SearchHistoryPage.jsx"
import NotFoundPage from "./pages/404.jsx"
import Footer from "./components/Footer.jsx"
import {Toaster} from "react-hot-toast"
import { useAuthStore } from './store/authUser.js'
import { Loader } from 'lucide-react'


function App() {
  const {user,isCheckingAuth,authCheck}= useAuthStore()
  
useEffect(()=>{
  authCheck()
},[authCheck])

if(isCheckingAuth){
  return(
    <div className='h-screen w-full'> 
    <div className='flex justify-center items-center bg-black h-full'>
      <Loader className="animate-spin text-teal-500 size-48"/>
    </div>
    </div>
  )
}

  return (
    <>
      <Routes>
        <Route path ="/" element={<HomePage/>}/>
        <Route path ="/login" element={!user? <LoginPage></LoginPage>:<Navigate to={'/'}/>}/>
        <Route path="/signup" element={!user ? <SignUpPage/> :<Navigate to={'/'}/>}/>
        <Route path="/watch/:id" element={user ? <WatchPage/> :<Navigate to={'/login'}/>}/>
        <Route path="/search" element={user ? <SearchPage/> :<Navigate to={'/login'}/>}/>
        <Route path="/history" element={user ? <SearchHistoryPage/> :<Navigate to={'/login'}/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
       
      </Routes>
      <Footer/>
      <Toaster/>
    </>
  )
}

export default App

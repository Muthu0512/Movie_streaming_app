
import { create } from "zustand";
import toast from "react-hot-toast"
import  axios  from "axios";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp:false,
  isCheckingAuth:true,
  isLoggingOut:false,
  isLoggingIn:false,

  // signin

  signup: async (credentials) => {
    set({isSigningUp:true})
    try {
        const response = await axios.post("/api/v1/auth/signup",credentials)
        set({user:response.data.user, isSigningUp:false})
        toast.success("Account Created successfully")
    } catch (error) {
        toast.error(error.response.data.message || "Signup failed")
        set({isSigningUp:false,user:null})
    }
  },
  //login
  login: async (credentials) => {
    set({isLoggingIn:true})
    try {
      const response= await axios.post("/api/v1/auth/login",credentials)
      set({user:response.data.user,isLoggingIn:false})
      toast.success("Logged in succesfully")
    } catch (error) {
      set({isLoggingIn:false})
      toast.error(error.response.data.message || "Login failed")
    }
  },
  //logout
  logout: async () => {
    set({isLoggingOut:true})
    try {
     await axios.post("/api/v1/auth/logout")
      set({user:null, isLoggingOut:false})
      toast.success("Logged out successully")
    } catch (error) {
      set({isLoggingOut:false})
      toast.error(error.response.data.message || "Logout failed")
    }
  },
  //authentication check
  authCheck: async () => {
    set({isCheckingAuth:true})
    try {
      const response= await axios.get("/api/v1/auth/authCheck")
        set({user:response.data.user, isCheckingAuth:false})
    } catch (error) {
      set({isCheckingAuth:false, user:null})
    }
  },
}));

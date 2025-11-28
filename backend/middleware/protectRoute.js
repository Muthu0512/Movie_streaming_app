import jwt from "jsonwebtoken"
import {ENV_VARS} from "../config/envVar.js"
import {User} from "../model/user.model.js"

export const protectRoute = async(req,res,next)=>{
    try {
        const token = req.cookies["netflix-jwt"]

        if(!token){
            res.status(401).json({success:false,message:"Unauthorized - No token Provided"})
        }

        const decoded = jwt.verify(token,ENV_VARS.JWT_SECRET)
        if(!decoded){
            res.status(401).json({success:false, message:"Unauthorized - Invalid Token"})
        }
        const user= await User.findById(decoded.userId).select("-password")
        if(!user){
            res.status(404).json({success:false,message:"User not found"})
        }
        req.user=user
        next()
    } catch (error) {
        console.log("Error from Protected Route middleware", error.message)
        res.status(500).json({success:false,message:"Internal server Error"})
        
    }
}
import jwt from "jsonwebtoken"
import { ENV_VARS } from "../config/envVar.js"

const generateTokenAndSetCookie=(userId,res)=>{
    const token=jwt.sign({userId},ENV_VARS.JWT_SECRET,{expiresIn:"15d"})

    res.cookie("netflix-jwt",token,{
        maxAge:15*24*60*60*1000,
        httpOnly:true, //prevent XSS attacks cross-site scripting atttacks,make it not be accessed by JS
        sameSite:"strict", //CSRF attacks corss-site request forgery attacks
        secure:ENV_VARS.NODE_ENV !== "development"
    })
 return token
}

export default generateTokenAndSetCookie
import {User} from "../model/user.model.js"
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js"


export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({ success: false, message: "All fields are manatory" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: "Enter a valid Email id" });
    }
    if (password.length< 6) {
     return res.status(400).json({success: false, message: "Password should be atleast 6 characters",});
    }

    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail) {
       return res.status(400).json({ success: false, message: "Email already Exists" });
     }

    const existingUserByUsername = await User.findOne({ username: username });
    if (existingUserByUsername) {
      return res.status(400).json({ success: false, message: "Username already Exists" });
    }

    const salt=await bcryptjs.genSalt(10)
    const hashedPassword= await bcryptjs.hash(password,salt)
    const PROFILE_PICS =["/profile_1.png","/profile_2.png","/profile_3.png"]
    const image= PROFILE_PICS[Math.floor(Math.random()*PROFILE_PICS.length)]
    console.log(image)

    const newUser = new User({
         username:username,
        email:email,
        password:hashedPassword,
        image:image
    })
    generateTokenAndSetCookie(newUser._id,res)
    await newUser.save()
    res.status(201).json({success:true,User:{
        ...newUser._doc,
        password:""
        
    }})

  } catch (error) {
    console.log("error in signup controller :",error.message)
    res.status(500).json({success:false, message:"Internal server Error"})
  }
};

export const login = async (req, res) => {
  try {
    const {email,password} = req.body
    if(!email || !password){
        return res.status(400).json({success:false,message:"All fields are required"})
    }
    const user=await User.findOne({email:email})
    if(!user){
        return res.status(400).json({success:false,message:"Invalid credential"})
    }

    const validatePassword = await bcryptjs.compare(password,user.password)
    if(!validatePassword){
        return res.status(400).json({success:false,message:"Invalid credential"})
    }

    generateTokenAndSetCookie(user._id,res);

    res.status(200).json({success:true,user:{
        ...user._doc,
        password:""
    }})

  } catch (error) {
    console.log("Error in login controller",error.message)
    res.status(500).json({success:false, message:"Internal server Error"})
  }
};

export async function logout(req, res) {
 try {
    res.clearCookie("netflix-jwt")
    res.status(200).json({success:true,message:"Logged out successfully"})
    
 } catch (error) {
    console.log("Error in Logout controller", error.message)
    res.status(500).json({success:false,message:"Internal server Error"})
 }
}


export const authCheck=async(req,res)=>{
  try {
    res.status(200).json({success:true,user:req.user})
  } catch (error) {
    res.status(500).json({success:false,message:"Internal server Error"})
  }
}
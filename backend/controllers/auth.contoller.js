import {User} from '../models/user.model.js';
import bcryptjs from "bcryptjs";
import { generateVerificationCode } from '../utils/generateVerificationCode.js';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import {sendVerificationEmail} from '../mailtrap/emails.js'

export const signup=async(req,res)=>{
    const {email, password, name} = req.body;

try {
    if(!email || !password || !name){
        throw new Error("All fields are required");
    }
const userAlreadyExists = await User.findOne({email});
if(userAlreadyExists){
    return res.status(400).json({success:false,message:"User already exists"});
}

const hashedPassword =await bcryptjs.hash(password,10);
//123456 to  $12_98(*)#% like this format
const verificationCode =  generateVerificationCode();
const user = new User ({
    email,
    password:hashedPassword,
    name,
    verificationToken:verificationCode,
    verificationTokenExpiresAt:Date.now() + 24 * 60 * 60 * 1000 //24hrs
})

await user.save(); //save the New user to the database

//Lets create a token for the verified User, that registers in to the Database
//JWT
generateTokenAndSetCookie(res,User._id)
 await sendVerificationEmail(user.email,verificationCode);
res.status(201).json({success:true,message:"User created Successfully",user:{
    ...user._doc,
    password:undefined
}})

} catch (error) {
    res.status(400).json({success:false,message:error.message})
}
}

export const login=async(req,res)=>{
    res.send("login Route");
}

export const logout=async(req,res)=>{
    res.send("logout Route");
}

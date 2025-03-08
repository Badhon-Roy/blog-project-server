import config from "../../config";
import User from "../user/user.model";
import { ILoginUser } from "./auth.interface";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"


const loginUser = async(user : ILoginUser)=>{
    
    const isExitsUser = await User.findOne({email : user?.email})
    //*check email
    if(!isExitsUser){
        throw new Error("User not found!")
    }

    const isMatchPassword = await bcrypt.compare(user?.password ,isExitsUser?.password)
    //*check password
    if(!isMatchPassword){
        throw new Error("Password doesn't match!")
    }

    const jwtPayload = {
        userId: isExitsUser?._id,
        email : isExitsUser?.email,
        role : isExitsUser?.role
    }
    
    const accessToken = jwt.sign(jwtPayload, config.jwt_access_token_secret as string , { expiresIn: '1d' })
    const refreshToken = jwt.sign(jwtPayload, config.jwt_refresh_token_secret as string , { expiresIn: '1d' })
    return {
        accessToken,
        refreshToken
    };
}

export const AuthServices ={
    loginUser
}
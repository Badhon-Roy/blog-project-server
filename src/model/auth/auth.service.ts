import config from "../../config";
import AppError from "../../errors/AppError";
import User from "../user/user.model";
import { ILoginUser } from "./auth.interface";
import jwt from "jsonwebtoken"
import { createToken, verifyToken } from "./auth.utils";


const loginUser = async(payload : ILoginUser)=>{
    
    const user = await User.isUserExistsByCustomEmail(payload?.email)
    //*check email
    if(!user){
        throw new AppError(401, "This user not found!")
    }

    //*check isBlocked
    const isBlocked = user?.isBlocked
    if(isBlocked){
        throw new AppError(403, "This user is blocked!")
    }

    //*check password
    if(! await User.isMatchPassword(payload?.password, user?.password)){
        throw new Error("Password doesn't match!")
    }

    const jwtPayload = {
        email : user?.email,
        role : user?.role
    }
    
    const accessToken = createToken(jwtPayload, config.jwt_access_token_secret as string, config.jwt_access_token_expires_in as string)
    const refreshToken = createToken(jwtPayload, config.jwt_refresh_token_secret as string, config.jwt_refresh_token_expires_in as string)
    return {
        accessToken,
        refreshToken
    };
}

const refreshToken = async (token: string) => {
    // checking if the given token is valid
    const decoded = verifyToken(token, config.jwt_refresh_token_secret as string);
  
    const { email } = decoded;
  
    // checking if the user is exist
    const user = await User.isUserExistsByCustomEmail(email);
  
    if (!user) {
      throw new AppError(404, 'This user is not found !');
    }
  
    const jwtPayload = {
      email: user?.email,
      role: user?.role,
    };
  
    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_token_secret as string,
      config.jwt_access_token_expires_in as string,
    );
  
    return {
      accessToken
    };
  };

export const AuthServices ={
    loginUser,
    refreshToken
}
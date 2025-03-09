import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync"
import AppError from "../errors/AppError";
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config";
import { IUserRole } from "../model/user/user.interface";
import User from "../model/user/user.model";

const auth = (...requiredRoles: IUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        if (!token) {
            throw new AppError(401, "You are not authorized!")
        }

        const decoded = jwt.verify(token, config.jwt_access_token_secret as string) as JwtPayload;
        const {role, email} = decoded;


        const user = await User.isUserExistsByCustomEmail(email)
        //*check email
        if(!user){
            throw new AppError(401, "This user not found!")
        }
    
        //*check isBlocked
        const isBlocked = user?.isBlocked
        if(isBlocked){
            throw new AppError(403,"This user is blocked!")
        }

        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError(401, "You are not authorized!")
        }

        req.user = decoded as JwtPayload;
        next();
      
    })
}

export default auth;
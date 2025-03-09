import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface IUser {
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
    isBlocked: boolean;
}

export interface UserModel extends Model<IUser> {
    isUserExistsByCustomEmail(email : string) : Promise<IUser>;
    isMatchPassword(plainTextPassword : string,hashPassword : string) : Promise<boolean>
}

export type IUserRole = keyof typeof USER_ROLE;
import { IUser } from "./user.interface";
import User from "./user.model";

//* register user
const createUserIntoDB = async(data : IUser)=>{
    const result = await User.create(data);
    return result;
}

//*get all user
const getAllUser = async()=>{
    const result = await User.find();
    return result;
}

export const UserServices = {
    createUserIntoDB,
    getAllUser
}
import { Request, Response } from "express";
import { UserServices } from "./user.service";
import User from "./user.model";


const createUser = async (req: Request, res: Response) => {
    try {
        const user = req.body;
        const isExitsUser = await User.find({ email: user?.email })
        if (isExitsUser) {
            res.status(409).json({
                success: false,
                message: "User already exits!",
            })
            return;
        }
        const result = await UserServices.createUserIntoDB(user);

        res.status(200).json({
            success: true,
            message: "User register successfully",
            data: result
        })
    } catch (error) {
        res.status(404).json({
            success: true,
            message: "Something went wrong!",
            data: error
        })
    }
}

export const UserControllers = {
    createUser,
}
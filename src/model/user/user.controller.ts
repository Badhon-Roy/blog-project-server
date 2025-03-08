import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import User from "./user.model";
import catchAsync from "../../utils/catchAsync";

const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;
    const isExitsUser = await User.findOne({ email: user?.email })
    if (isExitsUser) {
        res.status(409).json({
            success: false,
            message: "User already exits!",
        })
        return;
    }
    const result = await UserServices.createUserIntoDB(user);

    res.status(201).json({
        success: true,
        message: "User register successfully",
        statusCode: 201,
        data: result
    })
})

const getAllUser = catchAsync(async (req,res)=>{
    const result = await UserServices.getAllUser();
    res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        data: result
    })
})

export const UserControllers = {
    createUser,
    getAllUser
}
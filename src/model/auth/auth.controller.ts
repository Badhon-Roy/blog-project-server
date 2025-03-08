import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";


const loginUser = catchAsync(async(req,res)=>{
    const user = req.body;
    const result = await AuthServices.loginUser(user)
    const {accessToken , refreshToken} = result;
    res.cookie('refreshToken',refreshToken,{
        secure : config.node_env === 'production',
        httpOnly : true
    })
    res.status(200).json({
        success : true,
        message : "User login successful",
        statusCode: 200,
        data: {
            token: accessToken
          }
    })
})

export const AuthControllers = {
    loginUser
}
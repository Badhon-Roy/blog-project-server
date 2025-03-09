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

const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await AuthServices.refreshToken(refreshToken);

    res.status(200).json({
        message: 'Access token is retrieved successfully!',
        success: true,
        data: result
    })
});


export const AuthControllers = {
    loginUser,
    refreshToken
}
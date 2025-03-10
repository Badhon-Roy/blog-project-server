import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import BlogModel from "../blog/blog.model";
import { AdminServices } from "./admin.service";


const blockUser = catchAsync(async (req, res) => {
    const { userId } = req.params;
    await AdminServices.updateBlockUserInDB(userId);
    res.status(200).json({
        success: true,
        message: "User blocked successfully",
        statusCode: 200
    });
});

const deleteBlog = catchAsync(async (req, res) => {
    const { id } = req.params;

    const isBlog = await BlogModel.findById(id)
    if(!isBlog){
        throw new AppError(404, "Blog is not found!")
    }
    await AdminServices.deleteBlogFromDB(id);
  
    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
      statusCode: 200
    });
  });


export const AdminControllers ={
    blockUser,
    deleteBlog
}
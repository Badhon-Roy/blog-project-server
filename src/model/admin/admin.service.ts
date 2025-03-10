import AppError from "../../errors/AppError";
import BlogModel from "../blog/blog.model";
import User from "../user/user.model";


const updateBlockUserInDB = async (userId: string) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new AppError(404, "User not found");
    }

    if (user?.isBlocked) {
        throw new AppError(404, "User is already blocked");
    }

    user.isBlocked = true;
    await user.save();
    return user;
};


const deleteBlogFromDB = async (blogId: string) => {
    const blog = await BlogModel.findByIdAndDelete(blogId);  
    return blog;
  };

export const AdminServices ={
    updateBlockUserInDB,
    deleteBlogFromDB
}
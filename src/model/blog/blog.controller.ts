import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import User from "../user/user.model";
import { BlogServices } from "./blog.service";

//*create blog
const createBlog = catchAsync(async (req, res) => {
    if (!req?.user) {
        throw new AppError(401, "You are not authorized!")

    }
    const currentUser = await User.findOne({ email: req?.user?.email })
    const modifiedData = {
        ...req.body,
        author: currentUser?._id
    }
    const result = await BlogServices.createBlogIntoDB(modifiedData)
    res.status(200).json({
        success: true,
        message: "Blog created successfully",
        statusCode: 201,
        data: result
    })
})
//* get all blog post 
const getAllBlog = catchAsync(async (req, res) => {
    const result = await BlogServices.getAllBlogFromDB(
        req.query
    )
    res.status(200).json({
        success: true,
        message: "Blogs fetched successfully",
        statusCode: 200,
        meta: result.meta,
        data: result.result
    })
})

//* get single all blog post 
const getSingleBlog = catchAsync(async (req, res) => {
    const { id } = req.params
    const result = await BlogServices.getSingleBlogFromDB(id)
    res.status(200).json({
        success: true,
        message: "Blogs fetched successfully",
        statusCode: 200,
        data: result
    })
})


//*update blog
const updateBlog = catchAsync(async (req, res) => {
    const { id } = req.params
    console.log(id);
    const result = await BlogServices.updateBlogIntoDB(id, req.body)
    res.status(200).json({
        success: true,
        message: "Blog updated successfully",
        statusCode: 200,
        data: result
    })
})

//* delete blog
const deleteBlog = catchAsync(async (req, res) => {
    const { id } = req.params
    const result = await BlogServices.deleteBlogFromDB(id)
    res.status(200).json({
        success: true,
        message: "Blog deleted successfully",
        statusCode: 200
    })
})

export const BlogControllers = {
    createBlog,
    getAllBlog,
    getSingleBlog,
    deleteBlog,
    updateBlog
}
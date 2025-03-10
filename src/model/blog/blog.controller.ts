import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import User from "../user/user.model";
import BlogModel from "./blog.model";
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
    const { search, sortBy, sortOrder, filter } = req.query;

    const blogs = await BlogServices.getAllBlogFromDB({
        search: search as string,
        sortBy: sortBy as string,
        sortOrder: sortOrder as "asc" | "desc",
        filter: filter as string,
    });

    res.status(200).json({
        success: true,
        message: "Blogs fetched successfully",
        statusCode: 200,
        data: blogs,
    });
});


//* get single all blog post 
const getSingleBlog = catchAsync(async (req, res) => {
    const { id } = req.params;
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
    const { id } = req.params;
    const currentUser = await User.findOne({ email: req?.user?.email });
    if (!currentUser) {
        throw new AppError(401, "Unauthorized: User not found")
    }
    const blog = await BlogModel.findById(id)
    if (!blog) {
        throw new AppError(404, "Blog not found!")
    }
    if (blog.author.toString() !== currentUser._id.toString()) {
        throw new AppError(403, "Forbidden: You are not the author of this blog")
    }
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
    const { id } = req.params;
    const currentUser = await User.findOne({ email: req?.user?.email });
    if (!currentUser) {
        throw new AppError(401, "Unauthorized: User not found")
    }
    const blog = await BlogModel.findById(id)
    if (!blog) {
        throw new AppError(404, "Blog not found!")
    }
    if (blog.author.toString() !== currentUser._id.toString()) {
        throw new AppError(403, "Forbidden: You are not the author of this blog")
    }

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
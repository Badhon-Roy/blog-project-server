import catchAsync from "../../utils/catchAsync";
import { BlogServices } from "./blog.service";

//*create blog
const createBlog = catchAsync(async (req, res)=>{
    const blog = req.body;
    const result = await BlogServices.createBlogIntoDB(blog)
    res.status(200).json({
        success: true,
        message: "Blog created successfully",
        statusCode: 201,
        data: result
    })
})
//* get all blog post 
const getAllBlog = catchAsync(async(req,res)=>{
    const result = await BlogServices.getAllBlogFromDB()
    res.status(200).json({
        success: true,
        message: "Blogs fetched successfully",
        statusCode: 200,
        data: result
    })
})

//* get single all blog post 
const getSingleBlog = catchAsync(async(req,res)=>{
    const {id} = req.params
    const result = await BlogServices.getSingleBlogFromDB(id)
    res.status(200).json({
        success: true,
        message: "Blogs fetched successfully",
        statusCode: 200,
        data: result
    })
})


//*update blog
const updateBlog = catchAsync(async(req, res)=>{
    const {id} = req.params
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
const deleteBlog = catchAsync(async(req, res)=>{
    const {id} = req.params
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
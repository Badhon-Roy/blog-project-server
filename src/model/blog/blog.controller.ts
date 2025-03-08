import catchAsync from "../../utils/catchAsync";
import { BlogServices } from "./blog.service";


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

export const BlogControllers = {
    createBlog
}
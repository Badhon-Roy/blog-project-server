import { IBlog } from "./blog.interface";
import BlogModel from "./blog.model";

//*create blog post
const createBlogIntoDB = async(blog : IBlog)=>{
    const result = await BlogModel.create(blog)
    return result;
}

//*update blog post
const  updateBlogIntoDB = async(id : string, data : any )=>{
    const result = await BlogModel.findByIdAndUpdate(id,data, {
        isNew : true
    })
    return result;
}

//*delete blog post
const deleteBlogFromDB = async(id: string)=>{
    const result = await BlogModel.findByIdAndDelete(id)
    return result
}

export const BlogServices ={
    createBlogIntoDB,
    updateBlogIntoDB,
    deleteBlogFromDB
}
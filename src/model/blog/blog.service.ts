import { IBlog } from "./blog.interface";
import BlogModel from "./blog.model";


const createBlogIntoDB = async(blog : IBlog)=>{
    const result = await BlogModel.create(blog)
    return result;
}

export const BlogServices ={
    createBlogIntoDB
}
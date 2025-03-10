import QueryBuilder from "../../builder/QueryBuilder";
import { blogSearchFields } from "./blog.constant";
import { IBlog } from "./blog.interface";
import BlogModel from "./blog.model";

//*create blog post
const createBlogIntoDB = async(blog : IBlog)=>{
    const result = await BlogModel.create(blog)
    return result;
}

//* get all blog post
const getAllBlogFromDB = async (
    query: Record<string, unknown>,
  ) => {
    const blogQuery = new QueryBuilder(BlogModel.find()
      .populate("author"), query)
      .search(blogSearchFields)
      .filter()
      .sort()
      .paginate()
      .fields();
  
    const result = await blogQuery.modelQuery;
    const meta = await blogQuery.countTotal();
    return {
      meta,
      result,
    };
  };
  


//* get single blog post
const getSingleBlogFromDB =async(id: string)=>{
    const result = await BlogModel.findById(id)
    return result
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
    getAllBlogFromDB,
    getSingleBlogFromDB,
    updateBlogIntoDB,
    deleteBlogFromDB
}
import QueryBuilder from "../../builder/QueryBuilder";
import { blogSearchFields } from "./blog.constant";
import { IBlog } from "./blog.interface";
import BlogModel from "./blog.model";

interface BlogQueryParams {
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  filter?: string;
}

//*create blog post
const createBlogIntoDB = async(blog : IBlog)=>{
    const result = await BlogModel.create(blog)
    return result;
}

//* get all blog post
const getAllBlogFromDB = async ({ search, sortBy = "createdAt", sortOrder = "desc", filter }: BlogQueryParams) => {
  let query: any = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } }
    ];
  }

  if (filter) {
    query.author = filter;
  }

  const sortOptions: any = {};
  sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

  // Fetch blogs and populate author details
  return await BlogModel.find(query).populate("author").sort(sortOptions);
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
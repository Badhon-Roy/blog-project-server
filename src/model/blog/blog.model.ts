import mongoose, { Schema, Document } from "mongoose";
import { IBlog } from "./blog.interface";

const blogSchema: Schema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    isPublished: {
      type: Boolean,
      default: true,
    }
  },
  { timestamps: true }
);

const BlogModel = mongoose.model<IBlog & Document>("Blog", blogSchema);
export default BlogModel;

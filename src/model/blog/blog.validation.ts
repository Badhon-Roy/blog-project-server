import { z } from "zod";


const createBlogPostSchemaValidation = z.object({
    body: z.object({
        title: z.string().min(5, "Title must be at least 5 characters long"),
        content: z.string().min(10, "Content must be at least 10 characters long"),
        author: z.string().min(4,"Author id is required!"),
        isPublished: z.boolean().default(true),
    })
})

export const blogValidation = {
    createBlogPostSchemaValidation
}
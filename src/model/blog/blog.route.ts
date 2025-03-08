import { Router } from "express";
import validateRequest from "../../middlewares/validationRequest";
import { blogValidation } from "./blog.validation";
import { BlogControllers } from "./blog.controller";


const router  = Router();

router.post('/', validateRequest(blogValidation.createBlogPostSchemaValidation), BlogControllers.createBlog)

export const blogsRouter = router;
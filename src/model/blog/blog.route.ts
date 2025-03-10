import { Router } from "express";
import validateRequest from "../../middlewares/validationRequest";
import { blogValidation } from "./blog.validation";
import { BlogControllers } from "./blog.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";


const router = Router();

router.post('/', auth(USER_ROLE.user), validateRequest(blogValidation.createBlogPostSchemaValidation), BlogControllers.createBlog)
router.get('/', BlogControllers.getAllBlog)
router.get('/:id', BlogControllers.getSingleBlog)
router.patch('/:id', auth(USER_ROLE.user), BlogControllers.updateBlog)
router.delete('/:id', auth(USER_ROLE.user), BlogControllers.deleteBlog)

export const blogsRouter = router;
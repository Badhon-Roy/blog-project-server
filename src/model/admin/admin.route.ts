import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { AdminControllers } from "./admin.controller";


const router = Router();
router.patch("/users/:userId/block", auth(USER_ROLE.admin), AdminControllers.blockUser)
router.delete("/blogs/:id", auth(USER_ROLE.admin), AdminControllers.deleteBlog)

export const adminRouter = router;
import { Router } from "express";
import { userRouter } from "../model/user/user.route";
import { authRouter } from "../model/auth/auth.route";
import { blogsRouter } from "../model/blog/blog.route";
import { adminRouter } from "../model/admin/admin.route";

const router = Router();

const moduleRoutes = [
    {
        path: "/users",
        route: userRouter
    },
    {
        path: "/auth",
        route: authRouter
    },
    {
        path: "/blogs",
        route: blogsRouter
    },
    {
        path: "/admin",
        route: adminRouter
    },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))
export default router;
import { Router } from "express";
import { userRouter } from "../model/user/user.route";
import { authRouter } from "../model/auth/auth.route";

const router = Router();

const moduleRoutes = [
    {
        path: "/users",
        route: userRouter
    },
    {
        path: "/auth",
        route: authRouter
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))
export default router;
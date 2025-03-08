import express from "express"
import { UserControllers } from "./user.controller";
import validationRequest from "../../middlewares/validationRequest";
import { usersValidation } from "./user.validation";

const router = express.Router();

router.get('/', UserControllers.getAllUser)

export const userRouter = router;
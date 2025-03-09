import { Router } from "express";
import validationRequest from "../../middlewares/validationRequest";
import { authValidation } from "./auth.validation";
import { AuthControllers } from "./auth.controller";
import { usersValidation } from "../user/user.validation";
import { UserControllers } from "../user/user.controller";


const router = Router();

router.post('/login', validationRequest(authValidation.loginUserSchemaValidation), AuthControllers.loginUser)
router.post('/register',validationRequest(usersValidation.createUserSchemaValidation) ,UserControllers.createUser)

router.post(
    '/refresh-token',
    validationRequest(authValidation.refreshTokenValidationSchema),
    AuthControllers.refreshToken,
  );


export const authRouter = router
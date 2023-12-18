import { Router } from "express";
import { UserLogin } from "./auth.controller";

const AuthRouter = Router();

AuthRouter.post("/login", UserLogin);

export default AuthRouter;

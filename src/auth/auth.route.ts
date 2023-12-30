import { Router } from "express";
import { UserLogin } from "./auth.controller";
import passport from "passport";

const AuthRouter = Router();

AuthRouter.post("/login", UserLogin);

/*
AuthRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

AuthRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

*/

export default AuthRouter;

import AuthRouter from "./auth/auth.route";
import constants from "./constant";
import UserRouter from "./user/user.route";

const requestMappings = (app: any) => {
  app.use(constants.API.PREFIX.concat("/user"), UserRouter);
  app.use(constants.API.PREFIX.concat("/auth"), AuthRouter);
};

export default requestMappings;

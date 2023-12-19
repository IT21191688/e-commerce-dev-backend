import AuthRouter from "./auth/auth.route";
import constants from "./constant";
import UserRouter from "./user/user.route";
import ProductRouter from "./product/product.route";

const requestMappings = (app: any) => {
  app.use(constants.API.PREFIX.concat("/user"), UserRouter);
  app.use(constants.API.PREFIX.concat("/auth"), AuthRouter);
  app.use(constants.API.PREFIX.concat("/product"), ProductRouter);
};

export default requestMappings;

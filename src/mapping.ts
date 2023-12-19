import AuthRouter from "./auth/auth.route";
import constants from "./constant";
import UserRouter from "./user/user.route";
import ProductRouter from "./product/product.route";
import OrderRouter from "./order/order.route";

const requestMappings = (app: any) => {
  app.use(constants.API.PREFIX.concat("/user"), UserRouter);
  app.use(constants.API.PREFIX.concat("/auth"), AuthRouter);
  app.use(constants.API.PREFIX.concat("/product"), ProductRouter);
  app.use(constants.API.PREFIX.concat("/order"), OrderRouter);
};

export default requestMappings;

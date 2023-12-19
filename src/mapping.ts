import AuthRouter from "./auth/auth.route";
import constants from "./constant";
import UserRouter from "./user/user.route";
import ProductRouter from "./product/product.route";
import OrderRouter from "./order/order.route";
import ReviewRouter from "./review/review.route";
import CartRouter from "./cart/cart.route";
import PaymentRouter from "./payment/payment.route";

const requestMappings = (app: any) => {
  app.use(constants.API.PREFIX.concat("/user"), UserRouter);
  app.use(constants.API.PREFIX.concat("/auth"), AuthRouter);
  app.use(constants.API.PREFIX.concat("/product"), ProductRouter);
  app.use(constants.API.PREFIX.concat("/order"), OrderRouter);
  app.use(constants.API.PREFIX.concat("/review"), ReviewRouter);
  app.use(constants.API.PREFIX.concat("/cart"), CartRouter);
  app.use(constants.API.PREFIX.concat("/payment"), PaymentRouter);
};

export default requestMappings;

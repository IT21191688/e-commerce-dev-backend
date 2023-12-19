import { Router } from "express";
import authMiddleware from "../auth/auth.middleware";

import {
  CreatePayment,
  RetrieveAllPayments,
  RetrievePaymentDetailsUsingId,
  RetrieveAllUserPayments,
} from "./payment.controller";

import constants from "../constant";

const PaymentRouter = Router();

PaymentRouter.post(
  "/createPayment",
  authMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  CreatePayment
);

PaymentRouter.get(
  "/retriveAllPayment",
  authMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  RetrieveAllPayments
);

PaymentRouter.get(
  "/retriveAllPaymentUsers/:userId",
  authMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  RetrieveAllUserPayments
);

PaymentRouter.get(
  "/retrivePayment/:paymentId",
  authMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  RetrievePaymentDetailsUsingId
);

export default PaymentRouter;

import Payment from "./payment.model";

const createPayment = async (paymentDetails: any) => {
  return await Payment.create(paymentDetails);
};

const retrieveAllPayments = async () => {
  return await Payment.find({});
};

const retrievePaymentDetailsById = async (paymentId: string) => {
  return await Payment.findById(paymentId);
};

const retrieveAllUserPayments = async (userId: string) => {
  return await Payment.find({ userId });
};

export default {
  createPayment,
  retrieveAllPayments,
  retrievePaymentDetailsById,
  retrieveAllUserPayments,
};

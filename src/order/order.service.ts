import Order from "./order.model";

const save = async (order: any, session: any) => {
  if (session) {
    return await order.save({ session });
  } else {
    return await order.save();
  }
};

const findAllOrders = () => {
  return Order.find({})
    .populate("products.productid")
    .populate("userid")
    .populate("paymentid");
};

const findOrdersByUserId = (userId: any) => {
  return Order.find({
    userid: userId,
  });
};

const findById = (id: any) => {
  return Order.findOne({ _id: id }).populate("paymentid");
};

const editOrderDetails = async (id: string, updatedDetails: any) => {
  return await Order.findByIdAndUpdate(id, updatedDetails, { new: true });
};

const deleteOrderById = async (orderId: string) => {
  return await Order.findByIdAndDelete(orderId);
};

export default {
  save,
  findOrdersByUserId,
  findById,
  findAllOrders,
  editOrderDetails,
  deleteOrderById,
};

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
  })
    .populate("products.productid")
    .populate("paymentid");
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

const findOrdersByDate = (date: any) => {
  const startOfDay = new Date(date);
  startOfDay.setUTCHours(0, 0, 0, 0); // Set the time to the start of the day
  const endOfDay = new Date(date);
  endOfDay.setUTCHours(23, 59, 59, 999); // Set the time to the end of the day

  return Order.find({
    orderdate: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
  })
    .populate("products.productid")
    .populate("userid")
    .populate("paymentid");
};

export default {
  save,
  findOrdersByUserId,
  findById,
  findAllOrders,
  editOrderDetails,
  deleteOrderById,
  findOrdersByDate,
};

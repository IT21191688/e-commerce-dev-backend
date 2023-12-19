import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import userService from "../user/user.service";
import productService from "../product/product.service";
import Order from "./order.model";
import orderService from "./order.service";
import CustomResponse from "../util/response";
import NotFoundError from "../error/error.classes/NotFoundError";
import ForbiddenError from "../error/error.classes/ForbiddenError";

import { sendEmail } from "../util/emailServer";
import emailService from "../util/email-templates/email.templates";

const CreateOrder = async (req: Request, res: Response) => {
  try {
    const auth: any = req.auth;
    const {
      productid,
      paymentid,
      quentity,
      totalprice,
      deliveryaddress,
      orderdate,
      orderstatus,
    } = req.body;

    // console.log(quentity);

    const user = await userService.findById(auth._id);
    if (!user) {
      throw new NotFoundError("User not found!");
    }

    const product = await productService.findById(productid);
    if (!product) {
      throw new NotFoundError("Product not found!");
    }

    const newOrder = new Order({
      userid: auth._id,
      productid,
      paymentid,
      quentity,
      totalprice,
      deliveryaddress,
      orderdate,
      orderstatus,
    });

    const createdOrder = await orderService.save(newOrder, null);

    if (createdOrder != null) {
      const subject = "Order Success";
      const htmlBody = emailService.OrderPlacedEmail({
        fullName: user.firstname + " " + user.lastname,
        orderId: createdOrder._id,
        orderDate: createdOrder.orderdate,
        totalAmount: createdOrder.totalprice,
      });

      // Send email to the user's email address
      await sendEmail(user.email, subject, htmlBody, null);
    }

    CustomResponse(
      res,
      true,
      StatusCodes.CREATED,
      "Order created successfully!",
      createdOrder
    );
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error creating order",
      error: error.message,
    });
  }
};

const FindAllOrders = async (req: Request, res: Response) => {
  const auth: any = req.auth;
  const user = await userService.findById(auth._id);
  if (!user) {
    throw new NotFoundError("User not found!");
  }

  try {
    const allOrders = await orderService.findAllOrders();

    CustomResponse(
      res,
      true,
      StatusCodes.OK,
      "All orders retrieved successfully!",
      allOrders
    );
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error retrieving orders",
      error: error.message,
    });
  }
};

const EditOrderDetails = async (req: Request, res: Response) => {
  try {
    const auth: any = req.auth;
    const orderId = req.params.orderId;

    const order = await orderService.findById(orderId);

    if (!order) {
      throw new NotFoundError("Order not found!");
    }

    if (auth.role !== "admin") {
      throw new ForbiddenError(
        "You are not authorized to update order status!"
      );
    }

    const updatedDetails = req.body;

    const updatedOrder = await orderService.editOrderDetails(
      orderId,
      updatedDetails
    );

    CustomResponse(
      res,
      true,
      StatusCodes.OK,
      "Order details updated successfully!",
      updatedOrder
    );
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error updating order details",
      error: error.message,
    });
  }
};

const DeleteOrder = async (req: Request, res: Response) => {
  try {
    const auth: any = req.auth;
    const orderId = req.params.orderId;

    const order = await orderService.findById(orderId);

    if (!order) {
      throw new NotFoundError("Order not found!");
    }

    if (auth.role !== "admin") {
      throw new ForbiddenError("You are not authorized to delete this order!");
    }

    await orderService.deleteOrderById(orderId);

    CustomResponse(
      res,
      true,
      StatusCodes.OK,
      "Order deleted successfully!",
      null
    );
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error deleting order",
      error: error.message,
    });
  }
};

const FindOneOrderById = async (req: Request, res: Response) => {
  const auth: any = req.auth;

  const user = await userService.findById(auth._id);
  if (!user) {
    throw new NotFoundError("User not found!");
  }
  try {
    const orderId = req.params.orderId;

    const order = await orderService.findById(orderId);

    if (!order) {
      throw new NotFoundError("Order not found!");
    }

    CustomResponse(
      res,
      true,
      StatusCodes.OK,
      "Order retrieved successfully!",
      order
    );
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error retrieving order",
      error: error.message,
    });
  }
};

const FindAllOrdersByUserId = async (req: Request, res: Response) => {
  const auth: any = req.auth;

  const user = await userService.findById(auth._id);
  if (!user) {
    throw new NotFoundError("User not found!");
  }

  try {
    const userId = auth._id;

    const orders = await orderService.findOrdersByUserId(userId);

    CustomResponse(
      res,
      true,
      StatusCodes.OK,
      "All orders retrieved successfully!",
      orders
    );
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error retrieving orders",
      error: error.message,
    });
  }
};

export {
  CreateOrder,
  FindAllOrders,
  EditOrderDetails,
  DeleteOrder,
  FindOneOrderById,
  FindAllOrdersByUserId,
};

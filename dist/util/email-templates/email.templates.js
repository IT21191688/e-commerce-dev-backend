"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserRegisteredEmail = (data) => {
    return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Welcome to Our E-commerce Platform</title>
        <style>
            /* Add inline CSS styles here for better email client compatibility */
            body {
                font-family: Arial, sans-serif;
                background-color: #f5f5f5;
                padding: 20px;
            }
            .container {
                background-color: #ffffff;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #333333;
            }
            p {
                font-size: 16px;
                color: #555555;
            }
            a {
                color: #007bff;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Welcome to Our E-commerce Platform, ${data.fullName}!</h1>
            <p>Dear ${data.fullName},</p>
            <p>Congratulations! You have successfully registered on our platform.</p>
            <p>Thank you for choosing our service. We're excited to have you as part of our community.</p>
            <p>Feel free to explore our wide range of products by visiting <a href="https://www.example.com/products">our product catalog</a>.</p>
            <p>If you have any questions or need assistance, don't hesitate to <a href="https://www.example.com/contact">contact us</a>. We're here to help!</p>
            <p>Happy shopping!</p>
        </div>
    </body>
    </html>
    `;
};
const OrderPlacedEmail = (data) => {
    return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Order Placed - E-commerce Platform</title>
        <style>
            /* Add inline CSS styles here for better email client compatibility */
            body {
                font-family: Arial, sans-serif;
                background-color: #f5f5f5;
                padding: 20px;
            }
            .container {
                background-color: #ffffff;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #333333;
            }
            p {
                font-size: 16px;
                color: #555555;
            }
            a {
                color: #007bff;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Order Placed Successfully!</h1>
            <p>Dear ${data.fullName},</p>
            <p>Thank you for placing your order with us.</p>
            <p>Order Details:</p>
            <ul>
                <li><strong>Order ID:</strong> ${data.orderId}</li>
                <li><strong>Order Date:</strong> ${data.orderDate}</li>
                <li><strong>Total Amount:</strong> ${data.totalAmount}</li>
                <!-- Add more order details as needed -->
            </ul>
            <p>Your order is being processed and will be shipped soon.</p>
            <p>If you have any inquiries regarding your order, feel free to <a href="https://www.example.com/contact">contact us</a>.</p>
            <p>Thank you for choosing our service!</p>
            <p>Best regards,</p>
            <p>The E-commerce Team</p>
        </div>
    </body>
    </html>
    `;
};
exports.default = {
    UserRegisteredEmail,
    OrderPlacedEmail,
};

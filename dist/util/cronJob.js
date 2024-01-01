"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendDailySummary = exports.cronJob = void 0;
const node_schedule_1 = __importDefault(require("node-schedule"));
const order_service_1 = __importDefault(require("../order/order.service"));
const email_templates_1 = __importDefault(require("./email-templates/email.templates"));
const emailServer_1 = require("./emailServer");
const cronJob = (cronTime, callback) => {
    node_schedule_1.default.scheduleJob(cronTime, callback);
};
exports.cronJob = cronJob;
const calculateAndSendDailySummary = async () => {
    try {
        const today = new Date();
        const orders = await order_service_1.default.findOrdersByDate(today);
        let totalERN = 0;
        const orderCount = orders.length;
        orders.forEach((order) => {
            totalERN += order.paymentid.transactionDetails.amount;
        });
        const htmlBody = email_templates_1.default.DailySummaryEmail(orderCount, totalERN);
        const subject = "today summary";
        const email = "sadeepalakshan0804@gmail.com";
        await (0, emailServer_1.sendEmail)(email, subject, htmlBody, null);
    }
    catch (error) {
        console.error("Error generating and sending report:", error);
        throw error;
    }
};
//this run on 11.55pm
const sendDailySummary = () => {
    (0, exports.cronJob)("55 23 * * *", async () => {
        //  console.log("Cron job running...");
        try {
            await calculateAndSendDailySummary();
        }
        catch (error) {
            console.error("Error running job:", error);
        }
    });
};
exports.sendDailySummary = sendDailySummary;

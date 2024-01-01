import schedule from "node-schedule";
import orderService from "../order/order.service";
import emailService from "./email-templates/email.templates";
import { sendEmail } from "./emailServer";

export const cronJob = (cronTime: string, callback: () => void) => {
  schedule.scheduleJob(cronTime, callback);
};

const calculateAndSendDailySummary = async () => {
  try {
    const today = new Date();
    const orders = await orderService.findOrdersByDate(today);

    let totalERN = 0;
    const orderCount = orders.length;

    orders.forEach((order: any) => {
      totalERN += order.paymentid.transactionDetails.amount;
    });

    const htmlBody = emailService.DailySummaryEmail(orderCount, totalERN);

    const subject = "today summary";

    const email = "sadeepalakshan0804@gmail.com";
    await sendEmail(email, subject, htmlBody, null);
  } catch (error) {
    console.error("Error generating and sending report:", error);
    throw error;
  }
};

//this run on 11.55pm
const sendDailySummary = () => {
  cronJob("55 23 * * *", async () => {
    //  console.log("Cron job running...");
    try {
      await calculateAndSendDailySummary();
    } catch (error) {
      console.error("Error running job:", error);
    }
  });
};

export { sendDailySummary };

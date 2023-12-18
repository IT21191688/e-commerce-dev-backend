import schedule from "node-schedule";
import appointmentService from "../appointment/appointment.service";
import emailTemplates from "./email-templates/email.templates";
import userService from "../user/user.service";
import { sendEmail } from "./emailServer";
import { timeSlots } from "../appointment/appointment.util";

//cron job helper fun
export const cronJob = (cronTime: string, callback: () => void) => {
  schedule.scheduleJob(cronTime, callback);
};

// */30 * * * * * => every 30 seconds
// 0 6 * * * => every day at 6 am

//send appointment reminders daily at 6 am
const sendAppointmentReminders = () => {
  cronJob("* * * * *", async () => {
    console.log("Appointment reminder cron job running...");
    //get today's date
    const today = new Date();

    //get all appointments for today
    const appointments: any = await appointmentService.findByDateAndApproved(
      new Date(today.toISOString().split("T")[0])
    );

    appointments.forEach(async (appointment: any) => {
      let user: any = await userService.findById(appointment.addedBy);

      let data: any = {
        userName: user.fullName,
        appointmentDate: appointment.appointmentDate,
        appointmentTime: timeSlots.find((time: any) => {
          return time.id === appointment.appointmentTime;
        })?.timeSlot,
      };

      let htmlBody = emailTemplates.AppointmentReminderTemplate(data);

      await sendEmail(user.email, "Appointment Reminder", htmlBody, null);
    });
  });
};

export { sendAppointmentReminders };

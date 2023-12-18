"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Job Email templates
const ApplyJobResponseMail = (data) => {
    return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Job Application Response</title>
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
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Job Application Response</h1>
            <p>Dear ${data.fullName},</p>
            <p>Thank you for applying for the ${data.title} position at ${data.companyName}.</p>
            <p>We will review your application and get back to you as soon as possible.</p>
            <p>Best regards,<br> ${data.companyName}</p>
        </div>
    </body>
    </html>
    `;
};
const ApplyJobMail = (data) => {
    return `<!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Job Application Request</title>
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
            </style>
        </head>
        <body>   
            <div class="container">
                <h1>Job Application Request</h1>
                <p>Dear ${data.companyName},</p>
                <p>${data.fullName} has applied for the ${data.title} position at ${data.companyName}.</p>
                <p>Resume is attached in this email</p>
                <p>Please review the application and get back to the applicant as soon as possible.</p>
                <p>Best regards,<br> ${data.companyName}</p>
            </div>
        </body>
        </html>`;
};
// Appointment Email templates
const NewAppointmentAlertTemplate = (data) => {
    return `
          <div>
          <h1>For ${data.orgName},</h1>
          <p>You got new appointment</p>
          <p>Appointment Details:</p>
          <p>Date: ${data.appointmentDate}</p>
          <p>Time: ${data.appointmentTime}</p>
          </div>
      `;
};
const AppointmentApprovedTemplate = (data) => {
    return `
          <div>
          <h1>For ${data.userName},</h1>
          <p>Your appointment has been approved</p>
          <p>Appointment Details:</p>
          <p>Date: ${data.appointmentDate}</p>
          <p>Time: ${data.appointmentTime}</p>
          </div>
      `;
};
const AppointmentRejectedTemplate = (data) => {
    return `
              <div>
              <h1>For ${data.userName},</h1>
              <p>Your appointment has been rejected</p>
              <p>Appointment Details:</p>
              <p>Date: ${data.appointmentDate}</p>
              <p>Time: ${data.appointmentTime}</p>
              </div>
          `;
};
const AppointmentReminderTemplate = (data) => {
    return `
                <div>
                <h1>For ${data.userName},</h1>
                <p>Your appointment is due in Today</p>
                <p>Appointment Details:</p>
                <p>Date: ${data.appointmentDate}</p>
                <p>Time: ${data.appointmentTime}</p>
                </div>
            `;
};
exports.default = {
    ApplyJobResponseMail,
    ApplyJobMail,
    AppointmentRejectedTemplate,
    AppointmentApprovedTemplate,
    NewAppointmentAlertTemplate,
    AppointmentReminderTemplate,
};

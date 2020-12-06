import asyncHandler from "express-async-handler";
import nodemailer from "nodemailer";

// @description: sends confirmation email
// @route: POST /api/email/confirm
// @access: public

const validateEmail = (email) => {
  if (!email) return false;

  if (email.length > 256) return false;

  const emailParts = email.split("@");

  const account = emailParts[0];
  const address = emailParts[1];

  if (account.length > 64) return false;

  const domain = address.split(".");

  if (domain.some((part) => part.length > 63)) return false;

  return true;
};
const confirmationEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log(email);

  if (true) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: "admin@hoopr.io",
        serviceClient: "CHECKJSONHOOPR",
        privateKey: "CHECKJSON",
      },
    });

    const mailOptions = {
      from: "admin@hoopr.io",
      to: "mikeyenx@gmail.com",
      subject: "Invoices due",
      text: "Dudes, we really need your money. JP it works.",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        // success res.json(info.response)
        console.log("Email sent: " + info.response);
      }
    });
  } else {
    res.status(400);
    throw new Error("Invalid email data");
  }
});

const reminderEmail = asyncHandler(async (req, res) => {
  console.log(req);
});

const cancellationEmail = asyncHandler(async (req, res) => {
  console.log(req);
});
export { confirmationEmail, reminderEmail, cancellationEmail };
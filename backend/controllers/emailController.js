import asyncHandler from "express-async-handler";
import nodemailer from "nodemailer";
import moment from "moment";

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

// @description: sends confirmation email
// @route: POST /api/email/confirm
// @access: public

const confirmationEmail = async (req, res) => {
  const { user, run } = req.body;
  if (validateEmail(user.email)) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: "admin@hoopr.io",
        serviceClient: process.env.GMAIL_CLIENT_ID,
        privateKey: process.env.GMAIL_PRIVATE_KEY,
      },
    });
    const mailOptions = {
      from: "admin@hoopr.io",
      to: user.email || "admin@hoopr.io",
      subject: "Congrats! You're all signed up!",
      text: `${user.username} get ready! Confirming your run @ ${
        run.location
      } on ${run.date} from ${moment(run.startTime).format("LT")} to ${moment(
        run.endTime
      ).format("LT")}.`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).send(info);
      }
    });
  } else {
    res.status(400);
    throw new Error("Invalid email data");
  }
};

const reminderEmail = asyncHandler(async (req, res) => {
  console.log(req);
});

const cancellationEmail = asyncHandler(async (req, res) => {
  console.log(req);
});
export { confirmationEmail, reminderEmail, cancellationEmail };

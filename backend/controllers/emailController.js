import nodemailer from "nodemailer";
import moment from "moment";
import Run from "../models/runModel.js";
import User from "../models/userModel.js";
import { CronJob } from "cron";

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

// @description: sends reminder emails daily to runs occurring the following day.

const findRunsForTomorrow = async () => {
  const tomorrow = moment().add(1, "days").format("LL");
  try {
    const runs = await Run.find({ date: tomorrow });
    for (let i = 0; i < runs.length; i++) {
      let run = runs[i];

      const runUsers = await User.find(
        {
          _id: { $in: run.users },
        },
        "email"
      ).select(["-_id"]);
      try {
        await reminderEmail(run, runUsers);
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.error(`findRuns function failed: ${error}`);
  }
};

const job = new CronJob(
  "0 18 * * *",
  findRunsForTomorrow,
  null,
  true,
  "America/Chicago"
);

// job.start();

const reminderEmail = async (run, users) => {
  // CHECK WHAT USERS IS STRUCTURED LIKE
  try {
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
      to: users,
      subject: "Reminder: You're hooping tomorrow!",
      text: `Get ready! Bring your A game, water, and lace up your kicks. You're signed up to run @ ${
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
  } catch (error) {
    res.status(400);
    throw new Error("Invalid email data");
  }
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
      to: user.email,
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

const cancellationEmail = async (req, res) => {
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
      to: user.email,
      subject: "Cancellation Confirmed",
      text: `${
        user.username
      }, we are sad to see you go! Confirming your cancellation, You are no longer registered for the run @ ${
        run.location
      } on ${run.date} from ${moment(run.startTime).format("LT")} to ${moment(
        run.endTime
      ).format(
        "LT"
      )}. You should be receiving an email via Stripe confirming your cancellation. If you do not please reach out to admin@hoopr.io`,
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
export { confirmationEmail, reminderEmail, cancellationEmail };

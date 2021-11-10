import nodemailer from 'nodemailer';
import moment from 'moment';
import Run from '../models/runModel.js';
import User from '../models/userModel.js';
import { CronJob } from 'cron';
import TinyURL from 'tinyurl';

const validateEmail = (email) => {
  if (!email) return false;

  if (email.length > 256) return false;

  const emailParts = email.split('@');

  const account = emailParts[0];
  const address = emailParts[1];

  if (account.length > 64) return false;

  const domain = address.split('.');

  if (domain.some((part) => part.length > 63)) return false;

  return true;
};

const spacifyText = (string) => {
  let result = string.split(' ').join('%20');
  return result;
};

// @description: sends reminder emails daily to runs occurring the following day.

const findRunsForTomorrow = async () => {
  const tomorrow = moment().add(1, 'days').format('LL');
  try {
    const runs = await Run.find({ date: tomorrow });
    for (let i = 0; i < runs.length; i++) {
      let run = runs[i];

      const runUsers = await User.find(
        {
          _id: { $in: run.users },
        },
        'email'
      ).select(['-_id']);
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
  '0 18 * * *',
  findRunsForTomorrow,
  null,
  true,
  'America/Chicago'
);

// job.start();

const reminderEmail = async (run, users) => {
  // CHECK WHAT USERS IS STRUCTURED LIKE
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: 'admin@hoopr.io',
        serviceClient: process.env.GMAIL_CLIENT_ID,
        privateKey: process.env.GMAIL_PRIVATE_KEY,
      },
    });
    const mailOptions = {
      from: 'admin@hoopr.io',
      to: users,
      subject: "Reminder: You're hooping tomorrow!",
      text: `Get ready! Bring your A game, water, and lace up your kicks. You're signed up to run @ ${
        run.location
      } on ${run.date} from ${moment(run.startTime).format('LT')} to ${moment(
        run.endTime
      ).format('LT')}.`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send(info);
      }
    });
  } catch (error) {
    res.status(400);
    throw new Error('Invalid email data');
  }
};

// @description: sends confirmation email
// @route: POST /api/email/confirm
// @access: public
const confirmationEmailTest = async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: '',
        serviceClient: '',
        privateKey: '',
      },
    });

    const mailOptions = {
      from: '',
      to: '',
      subject: 'TEST OAUTH2',
      text: 'plaintext fallback',
      html: `<h3>${'TEST OAUTH2'}</h3>`,
    };
    console.log(mailOptions);

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send(info);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const confirmationEmail = async (req, res) => {
  // const { user, run } = req.body;
  // if (validateEmail(user.email)) {

  const run = {
    price: 10,
    capacity: 15,
    _id: '5ffb72c92c202312daa7c601',
    name: 'Wednesday Morning Run',
    location: 'The Post',
    date: 'January 11, 2021',
    startTime: 'Sun Jan 10 2021 08:00:00 GMT-0600',
    endTime: 'Sun Jan 10 2021 10:00:00 GMT-0600',
    userId: '5ffb72c92c202312daa7c5ed',
  };
  // href={https://calendar.google.com/calendar/r/eventedit?text=${spacifyText(
  // run.name
  // )}&details=${spacifyText(run.name)}%20at%20${spacifyText(
  //   run.location
  // )}&location=${spacifyText(
  //   run.location
  // )}&dates=${dates}}
  const startTime = `${moment(run.date).format('YYYYMMDD')}T${moment(
    run.startTime
  ).format('HHmmSS')}`;
  const endTime = `${moment(run.date).format('YYYYMMDD')}T${moment(
    run.endTime
  ).format('HHmmSS')}`;
  const dates = startTime + '/' + endTime;
  // const data = {
  //   url: `{https://calendar.google.com/calendar/r/eventedit?text=${spacifyText(
  //     run.name
  //   )}&details=${spacifyText(run.name)}%20at%20${spacifyText(
  //     run.location
  //   )}&location=${spacifyText(run.location)}&dates=${dates}`,
  //   alias: "add-to-cal",
  // };
  let shortenedUrl = await TinyURL.shorten(
    `https://calendar.google.com/calendar/r/eventedit?text=${spacifyText(
      run.name
    )}&details=${spacifyText(run.name)}%20at%20${spacifyText(
      run.location
    )}&location=${spacifyText(run.location)}&dates=${dates}`
  );

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: 'admin@hoopr.io',
        serviceClient: process.env.GMAIL_CLIENT_ID,
        privateKey: process.env.GMAIL_PRIVATE_KEY,
      },
    });
    const startTime = `${moment(run.date).format('YYYYMMDD')}T${moment(
      run.startTime
    ).format('HHmmSS')}`;
    const endTime = `${moment(run.date).format('YYYYMMDD')}T${moment(
      run.endTime
    ).format('HHmmSS')}`;
    const dates = startTime + '/' + endTime;
    const mailOptions = {
      from: 'admin@hoopr.io',
      to: 'dcampuzano101@gmail.com',
      subject: "Congrats! You're all signed up!",
      text: 'plaintext fallback',
      html: `<h3>${'merkyoass'} get ready!</h3>
        <h5>Confirming your run @ ${run.location} on ${run.date} from ${moment(
        run.startTime
      ).format('LT')} to ${moment(run.endTime).format('LT')}.</h5>
      <a href="${shortenedUrl}">Add to your Google Calendar</a>`,
    };
    console.log(mailOptions);

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send(info);
      }
    });
  } catch (error) {
    console.log(error);
  }
  // } else {
  //   res.status(400);
  //   throw new Error("Invalid email data");
  // }
};

const cancellationEmail = async (req, res) => {
  const { user, run } = req.body;
  if (validateEmail(user.email)) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: 'admin@hoopr.io',
        serviceClient: process.env.GMAIL_CLIENT_ID,
        privateKey: process.env.GMAIL_PRIVATE_KEY,
      },
    });
    const mailOptions = {
      from: 'admin@hoopr.io',
      to: user.email,
      subject: 'Cancellation Confirmed',
      text: `${
        user.username
      }, we are sad to see you go! Confirming your cancellation, You are no longer registered for the run @ ${
        run.location
      } on ${run.date} from ${moment(run.startTime).format('LT')} to ${moment(
        run.endTime
      ).format(
        'LT'
      )}. You should be receiving an email via Stripe confirming your cancellation. If you do not please reach out to admin@hoopr.io`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send(info);
      }
    });
  } else {
    res.status(400);
    throw new Error('Invalid email data');
  }
};
export { confirmationEmail, reminderEmail, cancellationEmail };

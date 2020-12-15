import moment from "moment";
import axios from "axios";
const stripe = new Stripe(
  "sk_test_51Hi0CkCw3D7iMvxsxTGNxXXGNndJ6qnjlZCIuFnGNWmpYl5FL5ajlrGhwiZ3KYsgXfGS8WUuWgMpva2CY1DxEctB00JUHZcox1"
);

const handleDuration = (run) => {
  const startTime = run.startTime.split(" ")[4]; // "08:00:00"
  //try let
  const date = run.date.split(" ").slice();
  date[4] = startTime;

  date = date.join(" ");

  const now = moment(new Date());
  const end = moment(new Date(date));
  const duration = moment.duration(end.diff(now));
  const hours = duration.asHours();

  return hours;
};

const handleAmount = (hours, amountPaid) => {
  let percentRefund;
  switch (hours) {
    case hours >= 48:
      percentRefund = 1;
      break;
    case hours >= 24:
      percentRefund = 0.75;
      break;
    case hours >= 12:
      percentRefund = 0.5;
      break;

    default:
      percentRefund = 0;
      break;
  }
  return amountPaid * percentRefund;
};

const cancellationEmail = async (options) => {
  debugger;
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "http://localhost:5000/api/email/cancel",
      options,
      config
    );
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const createRefund = async (paymentIntent, amount) => {
  const refund = await stripe.refunds.create({
    payment_intent: paymentIntent,
    amount: amount,
  });

  res.json(refund);
};

const handleRefund = async (paymentIntent, run, user, amountPaid) => {
  try {
    const hours = handleDuration(run);

    const amountToRefund = handleAmount(hours, amountPaid);

    await createRefund(paymentIntent, amountToRefund);

    const emailOptions = {
      user: user,
      run: run,
    };

    cancellationEmail(emailOptions);
  } catch (error) {}
};

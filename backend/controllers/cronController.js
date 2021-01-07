import { CronJob } from "cron";

const job = new CronJob(
  "* * * * * *",
  () => {
    console.log("test test test test");
  },
  null,
  true,
  "America/Chicago"
);

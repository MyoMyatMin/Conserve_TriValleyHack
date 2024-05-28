import cron from "cron";
import https from "https";

const URL = "https://conserve-trivalleyhack.onrender.com/api/get";

const job = new cron.CronJob("*/14 * * * *", function () {
  https
    .get(URL, (res) => {
      if (res.statusCode === 200) {
        console.log("GET request sent successfully.");
      } else {
        console.log("Error while sending request", e);
      }
    })
    .on("error", (e) => {
      console.error("Error while sending request", e);
    });
});

export default job;

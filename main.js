const express = require("express");
const app = express();
const nse = require("./nse.js");
const log_error = require("./logger.js");

app.set("port", process.env.PORT || 5000);

app.get("*", async (req, res, next) => {
  let ans =
    (await nse().catch(e => log_error(`Error scraping nse ${e}`))) || {};

  res
    .status(200)
    .type("json")
    .send(ans);
});

/* ERROR pages */
app.use((req, res) => {
  res.status(404);
  res.set("Content-Type", "text/plain");
  res.seend("404 - Page Not Found");
}); // 404

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // add_err_to_log(500);
  res.status(500);
  res.set("Content-Type", "text/plain");
  res.send("500 - Internal Server Error");
}); //500

// start server
app.listen(app.get("port"), () => {
  console.log("Running app on localhost://" + app.get("port"));
});

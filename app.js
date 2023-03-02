const express = require("express");
const app = express();
const port = 5000;
const payload = "HelloWorld\n".repeat(10);

app.use((req, res, next) => {
  console.log(
    `host: ${req.hostname} | ${req.method} on ${req.path} ${Date.now()}`
  );
  next();
});
app.use(express.static("public"));
app.use(express.json());

// app.get("/", (req, res) => res.redirect(301, "/james_may_says_cheese.mp4"));
app.get("/", (req, res) => res.status(200).send(payload));

app.get("/test/നവംബർ", (req, res) => {
  res.send("OK");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

const express = require("express");
const app = express();
const port = 5000;
const payload = "HelloWorld\n".repeat(10);
const fs = require("fs");
const bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '100mb' }));

app.use((req, res, next) => {
  console.log(
    `host: ${req.hostname} | ${req.method} on ${req.path} ${Date.now()}`
  );
  next();
});
app.use(express.static("public"));
app.use(express.json());

app.post("/json-dump", (req, res) => {
  try {
    fs.writeFileSync(
      `./data-dump/${Date.now()}.json`,
      JSON.stringify(req.body)
    );
    res.status(200).send("All OK");
  } catch (err) {
    res.status(500).send(err);
  }
});

// app.get("/", (req, res) => res.redirect(301, "/james_may_says_cheese.mp4"));
app.get("/", (req, res) => res.status(200).send(payload));

app.get("/test/നവംബർ", (req, res) => {
  res.send("OK");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

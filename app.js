const express = require("express");
const app = express();
const port = 3002;

app.use((req, res, next) => {
  console.log(`${req.method} on ${req.path} ${Date.now()}`);
  next();
});
app.use(express.static("public"));
app.use(express.json())
app.get("/api/v1/config", (req, res) => {
  const dummyConfigObj = {
    "cdn-name": "https://gumlet.assettype.com/",
    "publisher-id": 829,
    "cdn-image": "gumlet.assettype.com",
  };
  return res.json(dummyConfigObj);
});
app.get("/", (req, res) => res.send("Hello"));
app.post("/api/save-daily-data", (req, res) => {
  console.log("req.body >> ", req.body);
  res.status(200).send("ok");
});
app.all("*", (req, res) => res.status(404).send("Not Found"));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

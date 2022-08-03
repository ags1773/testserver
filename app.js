const express = require("express");
// const zlib = require("zlib");

const app = express();
const port = 5000;
// const payload = "HelloWorld\n".repeat(1000);


app.use((req, res, next) => {
  console.log(`${req.method} on ${req.path} ${Date.now()}`);
  console.log("*** Host >> ", req.hostname)
  next();
});
app.use(express.static("public"));
app.use(express.json());
app.get("/", (req, res) => res.redirect(301, "/cheese.html"))
// app.get("/", (req, res) => res.send(payload));
// app.get("/gzip", (req, res, next) => {
//   zlib.gzip(payload, (err, encoded) => {
//     if (err) return next(err)
//     res.setHeader("Content-Type", "text/html")
//     res.setHeader("content-encoding", "gzip")
//     res.send(encoded)
//   })
// })
// app.get("/brotli", (req, res, next) => {
//   zlib.brotliCompress(payload, (err, encoded) => {
//     if (err) return next(err)
//     res.setHeader("Content-Type", "text/html")
//     res.setHeader("content-encoding", "br")
//     res.send(encoded)
//   })
// })
// app.all("*", (req, res) => res.status(404).send("Not Found"));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

const express = require("express");
const app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");
const parser = require("body-parser");
const path = require("path");
const port = 9119;

app.use(express.static(path.join(__dirname, "../public")));

//MEDIA COMPONENT
const mediaProxy = createProxyMiddleware({
  target: "http://localhost:8000",
  changeOrigin: true,
});

//MAINBODY SIDEBAR COMPONENT
const mainbodyProxy = createProxyMiddleware({
  target: "http://localhost:1991",
  changeOrigin: true,
});

//REVIEWS COMPONENT
const reviewsProxy = createProxyMiddleware({
  target: "http://localhost:4200",
  changeOrigin: true,
});

//ANNOUCEMENTS COMPONENT
const announcementsProxy = createProxyMiddleware({
  target: "http://localhost:8080",
  changeOrigin: true,
});

app.use("/media", mediaProxy);

app.use("/mainbody", mainbodyProxy);

app.use("/api/reviews/:id", reviewsProxy);

app.use("/getGame", announcementsProxy);

app.use(parser.json());

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});

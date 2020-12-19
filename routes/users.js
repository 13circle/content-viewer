const express = require("express");
const router = express.Router();

const title = "13circle Content Viewer";

router.get("/", (req, res, next) => {
  res.render("login", { title });
});

router.get("/register", (req, res, next) => {
  res.render("userinfo", { title, isNew: true });
});

router.get("/edit", (req, res, next) => {
  res.render("userinfo", { title, isNew: false });
});

router.post("/register", (req, res, next) => {
  //
});

router.delete("/unregister", (req, res, next) => {
  //
});

router.post("/login", (req, res, next) => {
  //
});

router.get("/check", (req, res, next) => {
  //
});

router.patch("/edit", (req, res, next) => {
  //
});

router.post("/logout", (req, res, next) => {
  //
});

module.exports = router;

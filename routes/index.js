const express = require("express");
const router = express.Router();

const mainRouter = require("@routes/main");
const usersRouter = require("@routes/users");

router.use("/", mainRouter);
router.use("/users", usersRouter);

module.exports = router;

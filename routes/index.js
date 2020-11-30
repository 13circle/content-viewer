const express = require("express");
const s3Handler = require("@utils/awsS3Handler");
const router = express.Router();

require("dotenv").config();

const s3BaseUrl = process.env.S3_BASE_URL;

/* GET home page. */
router.get("/", async (req, res, next) => {
  const dir = await s3Handler.listFolders("/");
  res.render("index", { title: "Express", dir });
});

module.exports = router;

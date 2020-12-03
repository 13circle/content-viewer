const express = require("express");
const s3Handler = require("@utils/awsS3Handler");
const router = express.Router();

require("dotenv").config();

const s3BaseUrl = process.env.S3_BASE_URL;
const title = "13circle Content Viewer";

const redirectVideo = (req, res, next) => {
  if (req.query.path) {
    if (req.query.path.split(".").pop() === "mp4") {
      return res.redirect(`/video?uri=${req.query.path}`);
    }
  }
  next();
};

/* GET home page. */
router.get("/", redirectVideo, async (req, res, next) => {
  let uri = "/";
  if (req.query.path) {
    uri += req.query.path.replace("Contents", "");
  }
  const dir = await s3Handler.listFolders(uri);
  res.render("index", { title, dir });
});

router.get("/video", async (req, res, next) => {
  const uri = req.query.uri;
  const { prevFolder } = await s3Handler.listFolders(
    uri.replace(s3BaseUrl + "Contents", "")
  );
  if (uri.split(".").pop() === "mp4") {
    return res.render("video", { title, prevFolder, uri });
  }
  return res.send("Error: only MP4 format is available.");
});

module.exports = router;

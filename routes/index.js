const express = require("express");
const s3Handler = require("@utils/awsS3Handler");
const axios = require("axios");
const router = express.Router();

require("dotenv").config();

const s3BaseUrl = process.env.S3_BASE_URL;
const title = "13circle Content Viewer";

const redirectByContentType = (req, res, next) => {
  const filePath = req.query.path;
  if (filePath) {
    const fileExt = filePath.split(".").pop();
    if (fileExt === "mp4") return res.redirect(`/video?uri=${filePath}`);
    if (fileExt === "txt") return res.redirect(`/text?uri=${filePath}`);
  }
  next();
};

/* GET home page. */
router.get("/", redirectByContentType, async (req, res, next) => {
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

router.get("/text", async (req, res, next) => {
  const uri = req.query.uri;
  const txtres = await axios.get(uri);
  const { prevFolder } = await s3Handler.listFolders(
    uri.replace(s3BaseUrl + "Contents", "")
  );
  return res.render("text", { title, prevFolder, textData: txtres.data });
});

module.exports = router;

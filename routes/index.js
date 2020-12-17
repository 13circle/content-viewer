const express = require("express");
const s3Handler = require("@utils/awsS3Handler");
const axios = require("axios");
const router = express.Router();

require("dotenv").config();

const s3BaseUrl = process.env.S3_BASE_URL;
const title = "13circle Content Viewer";

const redirectByContentType = (req, res, next) => {
  const filePath = req.query.path;
  if(filePath) {
    if (
      filePath.charAt(0) !== "/" &&
      filePath.charAt(filePath.length - 1) !== "/"
    ) {
      const fileExt = filePath.split(".").pop();
      if (fileExt === "mp4") return res.redirect(`/video?uri=${filePath}`);
      else if (fileExt === "txt") return res.redirect(`/text?uri=${filePath}`);
      else return res.redirect(`/file?uri=${filePath}`);
    }
  }
  next();
};

const getPrevFolder = async (uri) => {
  const { prevFolder } = await s3Handler.listFolders(
    uri.replace(s3BaseUrl + "Contents", "")
  );
  return prevFolder;
};

/* GET home page. */
router.get("/", redirectByContentType, async (req, res, next) => {
  let uri = "/";
  if (req.query.path) {
    uri += req.query.path.replace("Contents", "");
  }
  const dir = await s3Handler.listFolders(uri);
  const currFolderArr = dir.currFolder.split("/");
  let currFolderStr = "";
  currFolderArr.forEach((d, i) => {
    currFolderStr += "/" + d;
    currFolderArr[i] = currFolderStr;
  });
  dir.currFolder = currFolderArr.slice(0, -1);
  res.render("index", { title, dir });
});

router.get("/video", async (req, res, next) => {
  const uri = req.query.uri;
  const prevFolder = await getPrevFolder(uri);
  if (uri.split(".").pop() === "mp4") {
    return res.render("video", { title, prevFolder, uri });
  }
  return res.send("Error: only MP4 format is available.");
});

router.get("/text", async (req, res, next) => {
  const uri = req.query.uri;
  const txtres = await axios.get(uri);
  const prevFolder = await getPrevFolder(uri);
  return res.render("text", { title, prevFolder, textData: txtres.data });
});

router.get("/file", async (req, res, next) => {
  const uri = req.query.uri;
  const prevFolder = await getPrevFolder(uri);
  return res.render("file", { title, prevFolder, uri });
});

module.exports = router;

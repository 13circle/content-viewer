const express = require("express");
const s3Handler = require("@utils/awsS3Handler");
const router = express.Router();

const title = "13circle Content Viewer";

/* GET home page. */
router.get("/", async (req, res, next) => {
  let uri = "/";
  if(req.query.path) {
    uri += req.query.path.replace("Contents", "");
  }
  const dir = await s3Handler.listFolders(uri);
  res.render("index", { title, dir });
});

module.exports = router;

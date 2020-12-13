const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");
const s3ls = require("s3-ls");

require("dotenv").config();
const s3BaseUrl = process.env.S3_BASE_URL;
const BUCKET_NAME = process.env.S3_BUCKET_NAME;

const s3 = new AWS.S3();

async function listFolders(bucketPath) {
  const lister = s3ls({
    bucket: BUCKET_NAME,
  });

  const { files, folders } = await lister.ls(path.join("Contents", bucketPath));

  return {
    prevFolder: path.normalize(path.join("Contents", bucketPath, "..")),
    currFolder: path.normalize(path.join("Contents", bucketPath)),
    files: files.map((f) => s3BaseUrl + f),
    folders,
  };
}

function uploadFile(filePath) {
  const fileStream = fs.createReadStream(filePath);
  fileStream.on("error", (err) => {
    console.log("File Error", err);
  });
  const fileName = path.basename(filePath);
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: fileStream,
  };
  s3.upload(params, (err, data) => {
    if (err) throw err;
    console.log(`File uploaded successfully at ${data.Location}`);
  });
}

function downloadFile(objectKey, filePath) {
  const fileStream = fs.createWriteStream(filePath);
  fileStream.on("error", (err) => {
    console.log("File Error", err);
  });
  const params = {
    Bucket: BUCKET_NAME,
    Key: objectKey,
  };
  s3.getObject(params).createReadStream().pipe(fileStream);
}

module.exports = { listFolders, uploadFile, downloadFile };

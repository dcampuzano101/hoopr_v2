import aws from "aws-sdk";

import multer from "multer";

import multerS3 from "multer-s3";

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: "us-east-1",
});

const s3 = new aws.S3();

//don't think i need a file filter, handling fileTypes on frontend.

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "hoopr2",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: "TESTING_META_DATA!" });
    },
    key: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

export default upload;

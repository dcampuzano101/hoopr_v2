import express from "express";
const router = express.Router();

import upload from "../utils/fileUpload.js";

const singleUpload = upload.single("media");

// TRY TO CONVERT INTO ASYNCHRONOUS FUNCTIONS
router.post("/media-upload", function (req, res) {
  singleUpload(req, res, function (err) {
    if (err) {
      return res.status(422).send({
        errors: [{ title: "File Upload Error", detail: err.message }],
      });
    } else if (req.file.location) {
      return res.json({ mediaUrl: req.file.location });
    } else {
      return res.status(422).send({
        errors: [{ title: "File Upload Error", detail: "file upload error" }],
      });
    }
  });
});

export default router;

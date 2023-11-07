import { Router } from "express";
import multer from "multer";
import { handleFormSubmit } from "../controllers/test.controller.js";
import { v4 as uuidv4 } from "uuid";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    if (file.fieldname == "files") {
      const fileName = `${Date.now()}-${uuidv4()}-description-${
        file.originalname
      }`;
      cb(null, fileName); // Set the file name for the uploaded file
    } else if (file.fieldname == "bFiles") {
      const fileName = `${Date.now()}-${uuidv4()}-background-${
        file.originalname
      }`;
      cb(null, fileName); // Set the file name for the uploaded file
    }
  },
});

const upload = multer({ storage: storage });

const router = Router();

router.post(
  "/submit-form",
  upload.fields([{ name: "files" }, { name: "bFiles" }]),
  handleFormSubmit
);

export default router;

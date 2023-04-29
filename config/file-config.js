import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  //define the destination of the uploaded file
  destination: (req, file, cb) => {
    //file checking
    let uploadPath = "uploads/";
    switch (file.fieldname) {
      case "profile_photo":
        uploadPath = "uploads/profile_photo/";
        break;
      case "submission_attachment":
        uploadPath = "uploads/submissions/";
        break;
      case "handbook":
        uploadPath = "uploads/handbooks/";
        break;
      case "bukti_pembayaran":
        uploadPath = "uploads/bukti_pembayaran/";
        break;
      case "attachment":
        uploadPath = "uploads/agenda_attachment/";
        break;
      default:
        break;
    }

    // create the upload folder if it doesn't exist
    fs.mkdirSync(uploadPath, { recursive: true });

    //move the file(s)
    cb(null, uploadPath);
  },
  //define the name of the file
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

//configuring the multer, this enable of multiple files upload with different keys
const upload = multer({ storage: storage }).fields([
  { name: "profile_photo", maxCount: 1 },
  { name: "bukti_pembayaran", maxCount: 1 },
  { name: "attachment", maxCount: 1 },
  { name: "submission_attachment", maxCount: 1 },
]);

export default upload;

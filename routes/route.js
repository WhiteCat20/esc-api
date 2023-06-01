import express from "express";
import upload from "../config/file-config.js";
import { createUser, getUser } from "../controllers/ApplicantController.js";
import {
  createAgenda,
  createAttachment,
  createKodeAbsensi,
  getAgendas,
} from "../controllers/AgendaController.js";
import {
  createAnnouncement,
  getAnnouncements,
} from "../controllers/AnnouncementController.js";
import { createAttendance } from "../controllers/AttendanceController.js";
import {
  createSubmission,
  getSubmissions,
  submit,
} from "../controllers/SubmissionController.js";
import { verify } from "../controllers/VerificationController.js";
import { Login, Logout, refreshToken } from "../controllers/AuthController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

//auth
router.post("/login", upload, Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

//user & applicants
router.get("/user", verifyToken, getUser);
router.post("/user", upload, createUser);

//agenda & announcement & attendance
router.post("/attendance", upload, createAttendance);
router.get("/agenda", getAgendas);
router.post("/agenda", upload, createAgenda);
router.put("/agenda/:id/absensi", createKodeAbsensi);
router.put("/agenda/:id/attachment", upload, createAttachment);
router.get("/announcement", getAnnouncements);
router.post("/announcement", upload, createAnnouncement);

//submission and the responses
router.get("/submission", getSubmissions);
router.post("/submission", upload, createSubmission);
router.post("/submit/:id", upload, submit);

//verification
router.put("/verify/:id", upload, verify);

export default router;

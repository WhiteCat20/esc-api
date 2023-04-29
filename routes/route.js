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

const router = express.Router();

//user & applicants
router.get("/user", getUser);
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

export default router;

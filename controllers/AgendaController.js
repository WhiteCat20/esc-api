import slugify from "slugify";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAgendas = async (req, res) => {
  const allAgendas = await prisma.agenda.findMany({
    include: {
      Announcement: true,
      Attendance: true,
    },
  });
  res.status(200).json(allAgendas);
};

export const createAgenda = async (req, res) => {
  const { nama_agenda, tanggal, tempat, deskripsi } = req.body;
  const slug = slugify(nama_agenda, {
    lower: true,
  });
  let attachment = "";
  if (req.files.attachment) {
    attachment = req.files["attachment"][0].path;
  } else {
    attachment = null;
  }
  try {
    const newAgenda = await prisma.agenda.create({
      data: {
        nama_agenda,
        slug,
        tanggal,
        tempat,
        deskripsi,
        attachment,
      },
    });
    res.status(201).json(newAgenda);
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
};

export const createKodeAbsensi = async (req, res) => {
  const { id } = req.params;
  let kode_absensi = Math.floor(Math.random() * 900000) + 100000;
  kode_absensi = kode_absensi.toString();
  try {
    const filledAgenda = await prisma.agenda.update({
      where: {
        id: parseInt(id, 10),
      },
      data: {
        kode_absensi,
      },
    });
    res.json(filledAgenda);
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
};

export const createAttachment = async (req, res) => {
  const { id } = req.params;
  const attachment = req.files["attachment"][0].path;
  try {
    const editedAgenda = await prisma.agenda.update({
      where: {
        id: parseInt(id, 10),
      },
      data: {
        attachment,
      },
    });
    res.json(editedAgenda);
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
};

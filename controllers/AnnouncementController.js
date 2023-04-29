import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAnnouncements = async (req, res) => {
  const allAnnouncements = await prisma.announcement.findMany();
  res.json(allAnnouncements);
};

export const createAnnouncement = async (req, res) => {
  const { nama_admin, subject, deskripsi, agendaId } = req.body;
  try {
    const agenda = await prisma.agenda.findUnique({
      where: {
        id: Number(agendaId),
      },
    });
    if (!agenda) {
      return res.status(404).json("Agenda not found!");
    }

    let attachment = "";
    if (req.files.attachment) {
      attachment = req.files["attachment"][0].path;
    } else {
      attachment = null;
    }

    const announcement = await prisma.announcement.create({
      data: {
        nama_admin,
        subject,
        deskripsi,
        attachment,
        agenda: {
          connect: {
            id: Number(agendaId),
          },
        },
      },
    });
    res.status(201).json(announcement);
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
};

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createAttendance = async (req, res) => {
  const { userId, kode_absensi, agendaId } = req.body;

  //take the specified agenda
  const agenda = await prisma.agenda.findUnique({
    where: {
      id: Number(agendaId),
    },
  });

  //verify the user's code input / request
  if (!agenda || agenda.kode_absensi !== kode_absensi) {
    return res.status(404).json({ error: "Invalid Attendance Code" });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  try {
    const attendance = await prisma.attendance.create({
      data: {
        nama_peserta: user.name,
        agenda: {
          connect: {
            id: Number(agendaId),
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    res.status(201).json(attendance);
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
};

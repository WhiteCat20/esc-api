import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export const getUser = async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      UserPreference: true,
      Attendance: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  res.json(users);
};

export const createUser = async (req, res) => {
  const { name, nrp, no_telp, email, password, kelompok, description } =
    req.body;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    const user = await prisma.user.create({
      data: {
        name,
        nrp,
        no_telp,
        email,
        password: hashPassword,
        UserPreference: {
          create: {
            kelompok: Number(kelompok),
            description,
            bukti_pembayaran: req.files["bukti_pembayaran"][0].path,
            profile_photo: req.files["profile_photo"][0].path,
          },
        },
      },
    });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
};

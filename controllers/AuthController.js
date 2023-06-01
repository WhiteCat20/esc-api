import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const prisma = new PrismaClient();

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
      include: {
        UserPreference: true,
      },
    });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json("wrong password");
    const userId = user.id;
    const name = user.name;
    const email = user.email;
    const nrp = user.nrp;
    const no_telp = user.no_telp;
    const role = user.role;
    const status = user.status;
    const profile_photo = user.UserPreference.profile_photo;

    const acc = process.env.ACCESS_TOKEN_SECRET;
    const refr = process.env.REFRESH_TOKEN_SECRET;

    const userPayload = {
      userId,
      name,
      email,
      nrp,
      no_telp,
      role,
      status,
      profile_photo,
    };

    const accessToken = jwt.sign({ userPayload }, acc, {
      expiresIn: "20s",
    });
    const refreshToken = jwt.sign({ userPayload }, refr, {
      expiresIn: "1d",
    });

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refresh_token: refreshToken,
      },
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ message: `Your Access token : ${accessToken}` });
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    const user = await prisma.user.findMany({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!user) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403);
        const userId = decoded.id;
        const name = decoded.name;
        const email = decoded.email;
        const nrp = decoded.nrp;
        const no_telp = decoded.no_telp;
        const role = decoded.role;
        const status = decoded.status;
        const profile_photo = decoded.profile_photo;

        const payload = {
          userId,
          name,
          email,
          nrp,
          no_telp,
          role,
          status,
          profile_photo,
        };

        const accessToken = jwt.sign(
          { payload },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "30s",
          }
        );
        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await prisma.user.findMany({
    where: {
      refresh_token: refreshToken,
    },
  });
  const userId = user[0].id;

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      refresh_token: null,
    },
  });
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};

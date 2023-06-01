import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const verify = async (req, res) => {
  const { id } = req.params;
  try {
    const verifiedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        status: "Verified",
      },
    });
    res.json({
      message: `user with name ${verifiedUser.name} is now verified!`,
    });
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
};

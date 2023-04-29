import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getSubmissions = async (req, res) => {
  const submissions = await prisma.submission.findMany({
    include: {
      Submission_responses: true,
    },
  });
  res.status(200).json(submissions);
};

export const createSubmission = async (req, res) => {
  const { submission_name, deskripsi } = req.body;
  try {
    const submission = await prisma.submission.create({
      data: {
        submission_name,
        deskripsi,
      },
    });
    res.json(submission);
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
};

export const submit = async (req, res) => {
  const { nama_peserta } = req.body;
  const { id } = req.params;
  try {
    const submit = await prisma.submission_responses.create({
      data: {
        nama_peserta,
        submission_attachment: req.files["submission_attachment"][0].path,
        submission: {
          connect: {
            id: Number(id),
          },
        },
      },
    });
    res.status(201).json({ message: "File submitted!", created: submit });
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
};

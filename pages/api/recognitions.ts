import prisma from "../../lib/prisma";

export default async function postRecognition(req, res) {
  if (req.method === "POST") {
    const { body } = req;
    const data = JSON.parse(body);
    const recognition = await prisma.recognition.create({
      data,
    });
    res.json(recognition);
  }
}

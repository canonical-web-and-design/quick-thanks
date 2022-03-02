import { GetStaticProps } from "next";
import prisma from "../../lib/prisma";

export default async function postRecognition(req, res) {
  const { title, author, recipient, content, published } = req.body;

  // const session = await getSession({ req });

  // const recognition = await prisma.recognition.create({
  //   data: data,
  // });

  // res.json(recognition);
}

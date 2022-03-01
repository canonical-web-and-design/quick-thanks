import { PrismaClient } from "@prisma/client";
import { GetStaticProps } from "next";
const prisma = new PrismaClient()

// export const getStaticProps: GetStaticProps = async () => {
//     const feed = await prisma.recognition.findMany({
//       where: { published: true },
//       include: {
//         recipient: {
//           select: { fullName: true },
//         },
//         author: {
//           select: { fullName: true }
//         }
//       },
//     });
//     return { props: { feed } };
// }

export default async function postRecognition ( req , res ) {
    const { title, author, recipient, content, published } = req.body;

    // const session = await getSession({ req });
    
    const recognition = await prisma.recognition.create({
        data: data
      });
    console.log(recognition)
}
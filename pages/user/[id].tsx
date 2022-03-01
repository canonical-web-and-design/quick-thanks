import React from "react";
import { GetServerSideProps } from "next";
import Recognition from "../../components/Recognition";
import prisma from "../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const feed = await prisma.recognition.findMany({
    where: {
      recipientId: Number(params?.id) || -1,
    },
    include: {
      recipient: {
        select: { fullName: true },
      },
      author: {
        select: { fullName: true },
      },
    },
  });
  const user = await prisma.user.findUnique({ where: { id:Number(params?.id) || -1 }})

  return {
    props: { feed, user },
  };
};

type Props = {
  userId: number;
  feed: any
  user: any
};

const Recognitions: React.FC<Props> = (props) => {
  return (
    <>
      <h2>Quick Thanks for {props.user.fullName}</h2>
      <div style={{ display: "flex" }}>
        {props.feed.length > 0 ? props.feed.map((recognition) => (
          <div
            key={recognition.id}
            className="post"
            style={{ width: "300px", margin: "10px" }}
          >
            <Recognition recognition={recognition} />
          </div>
        )) : "No recognitions yet"}
      </div>
    </>
  );
};

export default Recognitions;

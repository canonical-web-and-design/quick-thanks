import React from "react";
import { GetServerSideProps } from "next";
import prisma from "../../lib/prisma";
import User from "./User";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const receivedRecognitions = await prisma.recognition.findMany({
    where: {
      recipientId: Number(params?.id) || -1,
    },
  });

  const givenRecognitions = await prisma.recognition.findMany({
    where: {
      authorId: Number(params?.id) || -1,
    },
  });

  const users = await prisma.user
    .findMany()
  const user = users.find((u) => u.id === Number(params?.id));

  return {
    props: { receivedRecognitions, givenRecognitions, users, user },
  };
};

const UserPage = (props) => {
  const { data: session, status } = useSession();

  const router = useRouter();

  React.useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status]);

  return status === "authenticated" ? (
    <User {...props} session={session} />
  ) : null;
};

export default UserPage;

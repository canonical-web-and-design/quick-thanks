import React from "react";
import { GetServerSideProps } from "next";
import prisma from "../../lib/prisma";
import { AnimatePresence, motion } from "framer-motion";
import User from "./User";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const receivedRecognitions = await prisma.recognition.findMany({
    where: {
      recipientId: Number(params?.id) || -1,
    },
  });

  const users = await prisma.user.findMany();
  const user = await prisma.user.findUnique({
    where: { id: Number(params?.id) || -1 },
  });

  return {
    props: { receivedRecognitions, user, users },
  };
};

type Props = {
  userId: number;
  feed: any;
  user: any;
};

const Points = ({
  name,
  value,
  transitionDelay,
}: {
  name: string;
  value: number;
  transitionDelay?: number;
}) => {
  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: transitionDelay || 0 }}
          exit={{ opacity: 0 }}
        >
          <h3 className="p-heading--5">{name}</h3>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: transitionDelay || 0 }}
          exit={{ opacity: 0 }}
        >
          <span className="p-heading--2">{value}</span>
        </motion.div>
      </AnimatePresence>
    </>
  );
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


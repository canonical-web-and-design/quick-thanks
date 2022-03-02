import React from "react";
import { GetServerSideProps } from "next";
import Recognition from "../../components/Recognition";
import prisma from "../../lib/prisma";
import { Row, Col } from "@canonical/react-components";
import { AnimatePresence, motion } from "framer-motion";

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

const Recognitions: React.FC<Props> = (props) => {
  return (
    <>
      <section className="p-strip--suru">
        <div className="u-fixed-width">
          <h1 className="p-heading--3">
            Quick thanks for <br />
            <span className="p-heading--1">{props.user?.fullName}</span>
          </h1>
        </div>
        <Row>
          <Col size={2}>
            <Points name="Received" value={props.feed.length} />
          </Col>

          <Col size={2}>
            <Points
              name="Villager Points"
              value={props.user?.receivedVillagerPoints}
              transitionDelay={0.25}
            />
            {/* outstanding teammate supporting others */}
          </Col>
          <Col size={2}>
            <Points
              name="Explorer Points"
              value={props.user?.receivedExplorerPoints}
              transitionDelay={0.5}
            />
            {/* brilliant ideas, innovation */}
          </Col>
        </Row>
      </section>
      <section className="p-strip">
        {props.feed.length > 0
          ? props.feed.map((recognition) => (
              <Row>
                <Col size={12}>
                  <Recognition recognition={recognition} />
                </Col>
              </Row>
            ))
          : "No recognitions yet"}
      </section>
    </>
  );
};

export default Recognitions;

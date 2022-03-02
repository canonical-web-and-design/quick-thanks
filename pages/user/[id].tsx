import React from "react";
import { GetServerSideProps } from "next";
import Recognition from "../../components/Recognition";
import prisma from "../../lib/prisma";
import { Row, Col } from "@canonical/react-components";

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
      <section className="p-strip--suru">
        <div className="u-fixed-width">
          <h1 className="p-heading--3">
            Quick thanks for <br />
            <span className="p-heading--1">{props.user?.fullName}</span>
          </h1>
        </div>
        <Row>
          <Col size={2}>
            <h3 className="p-heading--5">
              Received <br />
              <span className="p-heading--2">{props.feed.length}</span>
            </h3>
          </Col>
          <Col size={2}>
            <h3 className="p-heading--5">
              Villager Points <br />
              <span className="p-heading--2">
                {props.user?.receivedVillagerPoints}
              </span>
            </h3>
            {/* outstanding teammate supporting others */}
          </Col>
          <Col size={2}>
            <h3 className="p-heading--5">
              Explorer Points <br />
              <span className="p-heading--2">
                {props.user?.receivedExplorerPoints}
              </span>
            </h3>
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

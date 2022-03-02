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
          <h1>Quick Thanks for {props.user?.fullName}</h1>
        </div>
        <Row>
          <Col size={2}>
            <h3 className="p-heading--5">Received</h3>
            <p className="p-heading--4">{props.feed.length}</p>
          </Col>
          <Col size={2}>
            <h3 className="p-heading--5">Villager Points</h3>
            <p className="p-heading--4">23</p>
          </Col>
          <Col size={2}>
            <h3 className="p-heading--5">Explorer Points</h3>
            <p className="p-heading--4">60</p>
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

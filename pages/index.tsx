import React from "react";
import { GetStaticProps } from "next";
import SendButton from "../components/SendButton";
import prisma from "../lib/prisma";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.recognition.findMany({
    where: { published: true },
    include: {
      recipient: {
        select: { fullName: true },
      },
      author: {
        select: { fullName: true },
      },
    },
  });
  const users = await prisma.user.findMany();

  return { props: { feed, users } };
};

type Props = {
  users: any[];
};

const Index: React.FC<Props> = (props) => {
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <section>
      <div className="p-strip--suru">
        <div className="u-fixed-width">
          <h1>Quick Thanks</h1>
          <br />
          <SendButton users={props.users} />
        </div>
      </div>
      <div className="p-strip">
        <div className="u-fixed-width">
          <h2>Users</h2>
          <ul>
            {props.users.map((user) => (
              <li key={user.id}>
                <Link href={`/user/${user.id}`}>{user.fullName}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Index;

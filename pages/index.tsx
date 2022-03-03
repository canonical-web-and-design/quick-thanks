import React from "react";
import { GetStaticProps } from "next";
import SendButton from "../components/SendButton";
import prisma from "../lib/prisma";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export const getStaticProps: GetStaticProps = async () => {
  const users = await prisma.user.findMany();

  return { props: { users } };
};

type Props = {
  users: any[];
};

const Index: React.FC<Props> = (props) => {
  const { data: session, status } = useSession();
  return (
    <section>
      <div className="p-strip--suru">
        <div className="u-fixed-width">
          <h1>Quick Thanks</h1>
          <br />
        </div>
      </div>
      <div className="p-strip">
        <div className="u-fixed-width">
          <h2>Users</h2>
          <ul>
            {props.users.map((user) => (
              <li key={user.id}>
                <Link href={`/user/${user.id}`}>
                  <a>{user.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Index;

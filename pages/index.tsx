import React from "react"
import { GetStaticProps } from "next"
import SendButton from "../components/SendButton"
import prisma from '../lib/prisma'
import Link from 'next/link'

export const getStaticProps: GetStaticProps = async () => {
    const feed = await prisma.recognition.findMany({
      where: { published: true },
      include: {
        recipient: {
          select: { fullName: true },
        },
        author: {
          select: { fullName: true }
        }
      },
    });
    const users = await prisma.user.findMany();

    return { props: { feed, users } };
}

type Props = {
  users: any[]
}

const Blog: React.FC<Props> = (props) => {
  return (
    <>
      <h1>Canonical Quick Thanks</h1>
      <main>
        <div>
          <SendButton users={props.users} />
          <h2>Users</h2>
          <ul>
            {props.users.map((user) => (
              <li>
                <Link href={`/user/${user.id}`}>{user.fullName}</Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}

export default Blog

import React from "react";
import { GetStaticProps } from "next";
import SendButton from "../components/SendButton";
import prisma from "../lib/prisma";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

type Props = {
  users: any[];
};

const Index: React.FC<Props> = (props) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    // @ts-ignore-next-line
    if (session?.user?.id) {
      // @ts-ignore-next-line
      router.push(`/user/${session?.user?.id}`);
    }
    // @ts-ignore-next-line
  }, [session?.user?.id]);

  return (<section>
      <div className="p-strip--suru">
        <div className="u-fixed-width">
          <h1>Quick Thanks</h1>
          <br />
          {!session ? <a className="p-button--brand" href="/api/auth/signin">
            Log in
          </a> : null}
        </div>
      </div>
    </section>);
};

export default Index;

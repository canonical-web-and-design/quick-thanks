import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"
import SendButton from "../components/SendButton"
import prisma from '../lib/prisma'
import Head from 'next/head'

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
  feed: PostProps[]
  users: any[]
}

const Blog: React.FC<Props> = (props) => {
  return (
    <>
      <Head>
        <title>Test</title>
        <link href="https://assets.ubuntu.com/v1/vanilla-framework-version-3.1.0.min.css" rel="stylesheet"/>
      </Head>
      <Layout>
        <div className="page">
          <h1>Canonical recoginition page</h1>
          <main>
            <div>
              <select> 
                <option value="">See my recognition</option>
                <option value="min">Min</option>
                <option value="andreu">Andreu</option>
                <option value="peter">Peter</option>
              </select>
              <SendButton users={props.users}/>
            </div>
            <div style={{"display": "flex"}} >
            {props.feed.map((post) => (
              <div key={post.id} className="post" style={{"width": "300px", "margin": "10px"}}>
                <Post post={post} />
              </div>
            ))}
            </div>
          </main>
        </div>
        <style jsx>{`
          .post {
            background: white;
            transition: box-shadow 0.1s ease-in;
          }

          .post:hover {
            box-shadow: 1px 1px 3px #aaa;
          }

          .post + .post {
            margin-top: 2rem;
          }
        `}</style>
      </Layout>
    </>
  )
}

export default Blog

import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"
import SendButton from "../components/SendButton"
import Head from 'next/head'

export const getStaticProps: GetStaticProps = async () => {
  const feed = [
    {
      id: 1,
      title: "Thank you ",
      content: "This has been a challenging time, and I appreciate you so much.",
      published: false,
      author: {
        name: "Peter",
        email: "burk@prisma.io",
      },
      recipient: {
        name: "Min",
        email: "burk@prisma.io",
      }
    },
    {
      id: 2,
      title: "Amazing",
      content: "You have no idea how much your help has meant",
      published: false,
      author: {
        name: "Andreu",
        email: "burk@prisma.io",
      },
      recipient: {
        name: "Peter",
        email: "burk@prisma.io",
      }
    },
    {
      id: 3,
      title: "Good job",
      content: "There was nothing random about your acts of kindness. Thank you for all you have done.",
      published: false,
      author: {
        name: "Lydia",
        email: "burk@prisma.io",
      },
      recipient: {
        name: "Dave",
        email: "burk@prisma.io",
      }
    },
    {
      id: 4,
      title: "Nice",
      content: "The best way to thank you for your work on my project is to keep you informed of the outcome—and I promise to do that. Meanwhile, you have played such an important part and your help won’t be forgotten.",
      published: false,
      author: {
        name: "Dave",
        email: "burk@prisma.io",
      },
      recipient: {
        name: "Lydia",
        email: "burk@prisma.io",
      }
    },
  ]
  return { props: { feed } }
}

type Props = {
  feed: PostProps[]
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
              <SendButton />
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

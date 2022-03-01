import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

type User = {
  id?: number;
  fullName: string;
}

export type PostProps = {
  id?: number;
  title: string;
  author: User | null;
  recipient: User;
  content: string;
  published: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
    console.log(post)
  const recipientName = post.recipient ? post.recipient.fullName : "Unknown author";
  const authorName = post.author ? post.author.fullName : "Unknown author";
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <small>From {authorName}</small>
      <h2>{post.title}</h2>
      <small>For {recipientName}</small>
      <ReactMarkdown children={post.content} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Post;

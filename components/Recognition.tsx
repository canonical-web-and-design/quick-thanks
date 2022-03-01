import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

type User = {
  fullName: string;
}

export type RecognitionProps = {
  id: number;
  title: string;
  author: User | null;
  recipient: User;
  content: string;
  published: boolean;
};

const Recognition: React.FC<{ recognition: RecognitionProps }> = ({
  recognition,
}) => {
  const authorName = recognition?.author?.fullName || "";

  return (
    <div className="p-card">
      <small>From {authorName}</small>
      <h2>{recognition.title}</h2>
      <ReactMarkdown children={recognition.content} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Recognition;

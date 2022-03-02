import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

type User = {
  id?: number;
  fullName: string;
};

export type RecognitionProps = {
  id?: number;
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
    <div>
      <blockquote className="p-pull-quote">
        <p className="p-pull-quote__quote">
          <ReactMarkdown children={recognition.content} />
        </p>
        <cite className="p-pull-quote__citation">From {authorName}</cite>
      </blockquote>
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

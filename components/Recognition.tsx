import React from "react";

type User = {
  id?: number;
  fullName: string;
};

export type RecognitionProps = {
  id?: number;
  author: User;
  authorId: User | null | number;
  recipientId: User | number;
  content: string;
  published: boolean;
};

const Recognition: React.FC<{
  recognition: RecognitionProps;
  author: string;
}> = ({ recognition, author }) => {
  return (
    <div className="p-card--highlighted" style={{ height: "12rem" }}>
      <blockquote className="p-pull-quote">
        <p className="p-pull-quote__quote">{recognition.content}</p>
        <cite className="p-pull-quote__citation">From {author}</cite>
      </blockquote>
    </div>
  );
};

export default Recognition;

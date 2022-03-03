import React from "react";

type User = {
  id?: number;
  fullName: string;
};

export type RecognitionProps = {
  id?: number;
  author: User;
  authorId: User | null | number
  recipientId: User | number;
  content: string;
  published: boolean;
};

const Recognition: React.FC<{ recognition: RecognitionProps }> = ({
  recognition,
}) => {
  const authorName = recognition?.author?.fullName || "";

  return (
    <div className="p-card" style={{ height: "12rem" }}>
      <blockquote className="p-pull-quote">
        <p className="p-pull-quote__quote">{recognition.content}</p>
        <cite className="p-pull-quote__citation">From {authorName}</cite>
      </blockquote>
    </div>
  );
};

export default Recognition;

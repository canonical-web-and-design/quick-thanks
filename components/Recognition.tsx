import React from "react";
import { RecognitionVariant } from "../lib/types";

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
  variant: RecognitionVariant;
  recognition: RecognitionProps;
  author: string;
  recipient: string;
}> = ({ variant, recognition, author, recipient }) => {
  return (
    <div className="p-card--highlighted" style={{ height: "12rem" }}>
      <blockquote className="p-pull-quote">
        <p className="p-pull-quote__quote">{recognition.content}</p>
        {variant === "sent" ? (
          <cite className="p-pull-quote__citation">To {recipient}</cite>
        ) : (
          <cite className="p-pull-quote__citation">From {author}</cite>
        )}
      </blockquote>
    </div>
  );
};

export default Recognition;

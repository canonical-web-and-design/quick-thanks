import React from "react";
import { Tabs } from "@canonical/react-components";
import { Prisma } from "@prisma/client";
import Recognition, { RecognitionProps } from "../../../components/Recognition";
import { RecognitionVariant } from "../../../lib/types";

const Card = (props) => (
  <div style={{ flex: "0.2", marginRight: "1.5rem" }}>
    <Recognition {...props} />
  </div>
);

type CardListProps = {
  variant: RecognitionVariant;
  recognitions: RecognitionProps[];
  users: Prisma.UserSelect[];
};

const CardList: React.FC<CardListProps> = ({ recognitions, users, variant }) => {
  const getUserName = (authorId) => {
    const user = users.find((user) => user.id === authorId);
    return user.name;
  };

  return <>{recognitions?.length > 0 ? (
    recognitions.map((recognition) => (
      <Card
        key={recognition.id}
        recognition={recognition}
        variant={variant}
        author={getUserName(recognition.authorId)}
        recipient={getUserName(recognition.recipientId)}
      />
    ))
  ) : (
    <p>No recognitions yet</p>
  )}</>;
};

const PreviousThanks = (props) => {
  const [activeTab, setActiveTab] =
    React.useState<RecognitionVariant>("received");

  return (
    <div>
      <Tabs
        links={[
          {
            active: activeTab === "received",
            label: "Thanks received",
            onClick: () => setActiveTab("received"),
          },
          {
            active: activeTab === "sent",
            label: "Thanks sent",
            onClick: () => setActiveTab("sent"),
          },
        ]}
      />
      <div
        className="u-equal-height"
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {activeTab === "received" ? (
          <CardList
            variant="received"
            recognitions={props.receivedRecognitions}
            users={props.users}
          />
        ) : (
          <CardList
            variant="sent"
            recognitions={props.givenRecognitions}
            users={props.users}
          />
        )}
      </div>
    </div>
  );
};

export default PreviousThanks;

import React from "react";
import { Tabs } from "@canonical/react-components";
import Recognition from "../../../components/Recognition";
import UserSummary from "./UserSummary";

const Card = (props) => (
  <div style={{ flex: "0.2", marginRight: "1.5rem" }}>
    <Recognition {...props} />
  </div>
);

const CardList = ({ recognitions, users }) => {
  const getAuthorName = (authorId) => {
    const user = users.find((user) => user.id === authorId);
    return user.name;
  };

  return recognitions?.length > 0 ? (
    recognitions.map((recognition) => (
      <Card
        key={recognition.id}
        recognition={recognition}
        author={getAuthorName(recognition.authorId)}
      />
    ))
  ) : (
    <p>No recognitions yet</p>
  );
};

const PreviousThanks = (props) => {
  const [activeTab, setActiveTab] = React.useState<
    "Thanks received" | "Thanks sent"
  >("Thanks received");

  return (
    <div>
      <Tabs
        links={[
          {
            active: activeTab === "Thanks received",
            label: "Thanks received",
            onClick: () => setActiveTab("Thanks received"),
          },
          {
            active: activeTab === "Thanks sent",
            label: "Thanks sent",
            onClick: () => setActiveTab("Thanks sent"),
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
        {activeTab === "Thanks received" ? (
          <CardList
            recognitions={props.receivedRecognitions}
            users={props.users}
          />
        ) : (
          <CardList
            recognitions={props.givenRecognitions}
            users={props.users}
          />
        )}
      </div>
    </div>
  );
};

export default PreviousThanks;

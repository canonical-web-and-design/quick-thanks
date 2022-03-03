import React from "react";
import { Tabs } from "@canonical/react-components";
import Recognition from "../../../components/Recognition";

const Card = (props) => <div style={{ flex: "0.2"  }}><Recognition recognition={props.recognition} /></div>

const PreviousThanks = (props) => {
    const [activeTab, setActiveTab] =
      React.useState<"Thanks received" | "Thanks spent">("Thanks received");

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
            active: activeTab === "Thanks spent",
            label: "Thanks spent",
            onClick: () => setActiveTab("Thanks spent"),
          },
        ]}
      />
      <div
        className="u-equal-height"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {props.receivedRecognitions.length > 0
          ? props.receivedRecognitions.map((recognition) => <Card recognition={recognition} />)
          : "No recognitions yet"}
      </div>
    </div>
  );
};

export default PreviousThanks;

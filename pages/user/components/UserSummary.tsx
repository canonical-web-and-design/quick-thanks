import { Col, Row } from "@canonical/react-components";
import React from "react";
import { ExplorerIcon, VillagerIcon } from "../../../components/Icons";

const UserSummary = (props) => {
  return (
    <div>
      <Row>
        <Col size={3}>
          <p>
            <ExplorerIcon color="white" /> Explorer points earned
          </p>
          <span className="p-heading--2">
            {props.user?.explorerPoints || 0}
          </span>
        </Col>
        <Col size={3}>
          <p>
            <VillagerIcon color="white" /> Villager points earned
          </p>
          <span className="p-heading--2">
            {props.user?.villagerPoints || 0}
          </span>
        </Col>
      </Row>
    </div>
  );
};

export default UserSummary;

import { Col, Row } from "@canonical/react-components";
import React from "react";
import { ExplorerIcon, VillagerIcon } from "../../../components/Icons";
import SendButton from "../../../components/SendButton";

const SendThanks = (props) => {
  return (
    <div>
      <Row>
        <Col size={12}>
          <span className="p-heading--5 u-sv3">
            Left to give by the end of this month
          </span>
        </Col>
      </Row>
      <Row>
        <Col size={4}>
          <p>
            <ExplorerIcon /> Explorer points left
          </p>
          <span className="p-heading--2 u-sv3">
            {props.user?.explorerPoints || 0}/
            {props.user?.remainingExplorerPointsToGive || 0}
          </span>
        </Col>
        <Col size={4}>
          <p>
            <VillagerIcon /> Villager points left
          </p>
          <span className="p-heading--2 u-sv3">
            {props.user?.villagerPoints || 0}/
            {props.user?.remainingVillagerPointsToGive || 0}
          </span>
        </Col>
      </Row>
      <Row>
        <Col size={12}>
          <SendButton {...props} />
        </Col>
      </Row>
    </div>
  );
};

export default SendThanks;

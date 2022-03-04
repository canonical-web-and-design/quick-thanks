import React from "react";
import { Col, Row } from "@canonical/react-components";
import { AnimatePresence, motion } from "framer-motion";

import { ExplorerIcon, VillagerIcon } from "../../../components/Icons";


const Points = ({
  name,
  value,
  transitionDelay,
}: {
  name: React.ReactNode;
  value: number;
  transitionDelay?: number;
}) => {
  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: transitionDelay || 0 }}
          exit={{ opacity: 0 }}
        >
          <p>{name}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: (transitionDelay || 0) + 0.2 }}
          exit={{ opacity: 0 }}
        >
          <span className="p-heading--2">{value}</span>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

const UserSummary = (props) => {
  return (
    <div>
      <Row>
        <Col size={3}>
          <Points
            transitionDelay={0.2}
            name={
              <>
                <ExplorerIcon color="white" /> Explorer points earned
              </>
            }
            value={props.user?.receivedExplorerPoints || 0}
          />
        </Col>
        <Col size={3}>
          <Points
            transitionDelay={0.5}
            name={
              <>
                <VillagerIcon color="white" /> Villager points earned
              </>
            }
            value={props.user?.receivedVillagerPoints || 0}
          />
        </Col>
      </Row>
    </div>
  );
};

export default UserSummary;

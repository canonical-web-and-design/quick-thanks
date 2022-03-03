import { Col, Row } from "@canonical/react-components";
import React from "react";

const Section = (props) => {
  return (
    <section
      className={`p-strip${props.light ? "--light" : ""}${
        props.suru ? "--suru" : ""
      } ${props.shallow ? "is-shallow" : ""}`}
    >
      <Row>
        <Col size={12}>
          <h2>{props.title}</h2>
          {props.children}
        </Col>
      </Row>
    </section>
  );
};

export default Section;

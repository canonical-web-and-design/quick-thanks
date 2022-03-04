import React from "react";

import Section from "./components/Section";
import UserSummary from "./components/UserSummary";
import GiveThanks from "./components/SendThanks";
import PreviousThanks from "./components/PreviousThanks";
import FadeIn from "./components/FadeIn";


const User = (props) => {
  return (
    <>
      <Section suru title={props.user?.name}>
        <UserSummary {...props} />
      </Section>
      <FadeIn delay={1}>
        {props.user.id === props.session.user.id ? (
          <Section shallow title="Send thanks">
            <GiveThanks {...props} />
          </Section>
        ) : null}
        <Section shallow title="Previous thanks">
          <PreviousThanks {...props} />
        </Section>
      </FadeIn>
    </>
  );
};

export default User;

import React from "react";

import Section from "./components/Section";
import UserSummary from "./components/UserSummary";
import GiveThanks from "./components/SendThanks";
import PreviousThanks from "./components/PreviousThanks";

const User = (props) => {
  return (
    <>
      <Section suru title="User name">
        <UserSummary {...props} />
      </Section>
      <Section shallow title="Send thanks">
        <GiveThanks {...props} />
      </Section>
      <Section light shallow title="Previous thanks">
        <PreviousThanks {...props} />
      </Section>
    </>
  );
};

export default User;

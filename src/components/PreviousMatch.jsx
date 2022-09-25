import React from "react";

import Match from "./Match";

function PreviousMatch({ match }) {
  return <Match type="previous" showMatchPoints match={match} />;
}

export default PreviousMatch;

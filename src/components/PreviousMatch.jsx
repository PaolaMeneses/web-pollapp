import React from "react";

import Match from "./Match";

function PreviousMatch({ pred }) {
  return <Match type="previous" showMatchPoints match={{ ...pred.match }} />;
}

export default PreviousMatch;

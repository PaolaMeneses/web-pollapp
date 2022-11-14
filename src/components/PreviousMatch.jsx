import React from "react";

import Match from "./Match";

function PreviousMatch({ pred }) {
  return (
    <Match
      type="previous"
      showMatchPoints
      match={{
        ...pred.match,
        localGoalPrediction: pred.localGoalPrediction,
        visitorGoalPrediction: pred.visitorGoalPrediction,
        points: pred.points,
      }}
    />
  );
}

export default PreviousMatch;

import React from "react";

import useGoalPrediction from "../hooks/useGoalPrediction";
import Match from "./Match";

const UpcomingMatch = ({ match }) => {
  const [localGoalPrediction, localMinusGoal, localAddGoal] = useGoalPrediction(
    match.localGoalPrediction ?? null
  );
  const [visitorGoalPrediction, visitorMinusGoal, visitorAddGoal] =
    useGoalPrediction(match.visitorGoalPrediction ?? null);

  return (
    <Match
      type="upcoming"
      showPredictionBtns
      match={{ ...match, localGoalPrediction, visitorGoalPrediction }}
      handlerLocalPrediction={{ localMinusGoal, localAddGoal }}
      handlerVisitorPrediction={{ visitorMinusGoal, visitorAddGoal }}
    />
  );
};

export default UpcomingMatch;

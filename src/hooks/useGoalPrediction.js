import { useState } from "react";

export default function useGoalPrediction(goal) {
  const [goalPrediction, setGoalPrediction] = useState(goal);

  const minusGoal = (goalPrediction) => {
    if (goalPrediction === null) {
      return 0;
    }

    return goalPrediction - 1;
  };

  const addGoal = (goalPrediction) => {
    if (goalPrediction === null) {
      return 0;
    }

    return goalPrediction + 1;
  };

  return [
    goalPrediction,
    setGoalPrediction,
    () => setGoalPrediction(minusGoal),
    () => setGoalPrediction(addGoal),
  ];
}

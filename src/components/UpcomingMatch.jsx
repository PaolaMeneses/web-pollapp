import { useToast } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { boardsApi } from "../api/board";
import { useUpdatePredictionGoalsMutation } from "../api/predictions";

import useGoalPrediction from "../hooks/useGoalPrediction";
import Match from "./Match";

const UpcomingMatch = ({ pred }) => {
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const toast = useToast();

  const [localGoalPrediction, localMinusGoal, localAddGoal] = useGoalPrediction(
    pred.localGoalPrediction ?? null
  );
  const [visitorGoalPrediction, visitorMinusGoal, visitorAddGoal] =
    useGoalPrediction(pred.visitorGoalPrediction ?? null);

  const [updatePredictionGoals, { isLoading }] =
    useUpdatePredictionGoalsMutation();

  const handlerUpdatePrediction = async () => {
    try {
      await updatePredictionGoals({
        predictionId: pred._id,
        payload: {
          localGoalPrediction,
          visitorGoalPrediction,
        },
      }).unwrap();

      dispatch(
        boardsApi.util.updateQueryData(
          "getBoardActiveDetail",
          boardId,
          (draftPosts) => {
            draftPosts.predictions = draftPosts.predictions.map((prediction) =>
              prediction._id === pred._id
                ? {
                    ...prediction,
                    localGoalPrediction,
                    visitorGoalPrediction,
                  }
                : prediction
            );
          }
        )
      );

      toast({
        position: "top",
        title: "¡Predicción guardada con exito!",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
    } catch (error) {
      console.log("error", error);
      toast({
        position: "top",
        title: error.data.message,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  };
  return (
    <Match
      type="upcoming"
      showPredictionBtns
      match={{ ...pred.match, localGoalPrediction, visitorGoalPrediction }}
      handlerLocalPrediction={{ localMinusGoal, localAddGoal }}
      handlerVisitorPrediction={{ visitorMinusGoal, visitorAddGoal }}
      handlerUpdatePrediction={handlerUpdatePrediction}
      updatePredictionLoading={isLoading}
      updatePredictionDisabled={
        localGoalPrediction === null ||
        visitorGoalPrediction === null ||
        (pred.localGoalPrediction === localGoalPrediction &&
          pred.visitorGoalPrediction === visitorGoalPrediction)
      }
    />
  );
};

export default UpcomingMatch;

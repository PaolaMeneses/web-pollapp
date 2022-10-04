// import { createApi } from '@reduxjs/toolkit/query/react'

// const matches = createApi({
//   reducerPath: "matchesApi",

// })

import teams from "../assets/data/teams.json";

const groups = [
  {
    groupName: "A",
    teams: [teams[0], teams[1], teams[2], teams[3]],
  },
  {
    groupName: "B",
    teams: [teams[4], teams[5], teams[6], teams[7]],
  },
];

const tags = [
  "Fase Grupos - Grupo A",
  "Fase Grupos - Grupo B",
  "Fase Grupos - Grupo C",
  "Fase Grupos - Grupo D",
  "Fase Grupos - Grupo E",
  "Fase Grupos - Grupo F",
  "Fase Grupos - Grupo G",
  "Fase Grupos - Grupo H",
  "Octavos de final",
  "Cuartos de final",
  "Semifinales",
  "Semifinales",
  "Eliminatoria tercer lugar",
  "Final",
];

const matches = [
  {
    id: 1,
    tag: "Fase Grupos - Grupo A",
    local: teams[0],
    localGoals: 0,
    visitor: teams[1],
    visitorGoals: 3,
    date: "20/11",
    time: "10:00",
  },
  {
    id: 2,
    tag: "Fase Grupos - Grupo B",
    local: teams[4],
    localGoals: 0,
    visitor: teams[5],
    visitorGoals: 3,
    date: "20/11",
    time: "10:00",
  },
  {
    id: 3,
    local: teams[2],
    localGoals: 1,
    visitor: teams[3],
    visitorGoals: 1,
    date: "20/11",
    time: "14:00",
  },
  {
    id: 4,
    local: teams[2],
    visitor: teams[0],
    date: "23/11",
    time: "10:00",
  },
  {
    id: 5,
    local: teams[3],
    visitor: teams[1],
    date: "23/11",
    time: "14:00",
  },
  {
    id: 6,
    local: teams[0],
    visitor: teams[3],
    date: "26/11",
    time: "10:00",
  },
  {
    id: 7,
    local: teams[2],
    visitor: teams[1],
    date: "26/11",
    time: "14:00",
  },
];

const previousMatches = [
  {
    id: 2,
    local: teams[2],
    localGoals: 1,
    localGoalPrediction: 0,
    visitor: teams[3],
    visitorGoals: 1,
    visitorGoalPrediction: 0,
    date: "20/11",
    time: "14:00",
  },
  {
    id: 1,
    local: teams[0],
    localGoals: 0,
    localGoalPrediction: null,
    visitor: teams[1],
    visitorGoals: 3,
    visitorGoalPrediction: null,
    date: "20/11",
    time: "10:00",
  },
];

export const getMatches = () =>
  new Promise((resolve, reject) => setTimeout(() => resolve(matches), 1000));

export const getPreviousMatches = () =>
  new Promise((resolve, reject) =>
    setTimeout(() => resolve(previousMatches), 1000)
  );

import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Training, Weekdays } from "../types";
import { RootState } from ".";
import "react-native-get-random-values";

export const calendarStore = createSlice({
  name: "calendar",
  initialState: {
    trainingList: [
      { id: "1", name: "a", weekday: Weekdays.Monday },
      { id: "2", name: "b", weekday: Weekdays.Wednesday },
      { id: "3", name: "c", weekday: Weekdays.Friday },
    ] as Array<Training>,
  },
  reducers: {
    removeTraining(state, actions: PayloadAction<string>) {
      const index = state.trainingList.findIndex(
        (training) => training.id === actions.payload
      );
      state.trainingList.splice(index, 1);
    },
    createTraining(state, actions: PayloadAction<Omit<Training, "id">>) {
      state.trainingList.push({ id: uuidv4(), ...actions.payload });
    },
  },
});

export const selectUser = createSelector(
  (state: RootState) => state.calendar.trainingList,
  (trainingList) => {
    const weekdaysList: { [key in Weekdays]: Array<Training> } = {
      [Weekdays.Monday]: [],
      [Weekdays.Tuesday]: [],
      [Weekdays.Wednesday]: [],
      [Weekdays.Thursday]: [],
      [Weekdays.Friday]: [],
      [Weekdays.Saturday]: [],
      [Weekdays.Sunday]: [],
    };

    trainingList.forEach((training) => {
      weekdaysList[training.weekday]?.push(training);
    });

    return weekdaysList;
  }
);

export const { removeTraining, createTraining } = calendarStore.actions;

import { createSlice } from "@reduxjs/toolkit";
import { Training, Weekdays } from "../types";
import { RootState } from ".";

export const calendarStore = createSlice({
  name: "calendar",
  initialState: {
    trainingList: [
      { name: "a", weekday: Weekdays.Monday },
      { name: "b", weekday: Weekdays.Wednesday },
      { name: "c", weekday: Weekdays.Friday },
    ] as Array<Training>,
  },
  reducers: {},
});

export const selectUser = (state: RootState) => {
  const trainingList = state.calendar.trainingList;
  const weekdaysList: { [key in Weekdays]: Array<Training> } = {
    [Weekdays.Monday]: [],
    [Weekdays.Tuesday]: [],
    [Weekdays.Wednesday]: [],
    [Weekdays.Thursday]: [],
    [Weekdays.Friday]: [],
    [Weekdays.Saturday]: [],
    [Weekdays.Sunday]: [],
  };

  trainingList.map((training) => {
    if (training.weekday in Weekdays) {
      weekdaysList[training.weekday].push(training);
    } else {
      throw new Error(
        `Invalid weekday!`
      );
    }
  });

  return weekdaysList;
};

export const {} = calendarStore.actions;

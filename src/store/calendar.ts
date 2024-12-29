import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Training, Weekdays } from "../types";
import { RootState } from ".";
import tables from "../db/tables";

export const calendarStore = createSlice({
  name: "calendar",
  initialState: {
    trainingList: [] as Array<Training>,
    inBDProcess: false,
    gettingTrainingList: false,
  },
  reducers: {
    removeTraining(state, actions: PayloadAction<string>) {
      const index = state.trainingList.findIndex(
        (training) => training.id === actions.payload
      );
      state.trainingList.splice(index, 1);
    },
  },
  extraReducers(build) {
    build.addCase(createTraining.pending, (state) => {
      state.inBDProcess = true;
    });
    build.addCase(createTraining.rejected, (state) => {
      state.inBDProcess = false;
    });
    build.addCase(createTraining.fulfilled, (state, actions) => {
      state.inBDProcess = false;
      state.trainingList.push(actions.payload);
    });

    build.addCase(getTrainingList.pending, (state) => {
      state.gettingTrainingList = true;
    });
    build.addCase(getTrainingList.rejected, (state) => {
      state.gettingTrainingList = false;
    });
    build.addCase(getTrainingList.fulfilled, (state, actions) => {
      state.gettingTrainingList = false;
      state.trainingList = actions.payload;
    });

    build.addCase(removeTraining.pending, (state) => {
      state.inBDProcess = true;
    });
    build.addCase(removeTraining.rejected, (state) => {
      state.inBDProcess = false;
    });
    build.addCase(removeTraining.fulfilled, (state, actions) => {
      state.inBDProcess = false;
      const index = state.trainingList.findIndex(
        (training) => training.id === actions.payload
      );
      state.trainingList.splice(index, 1);
    });
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

export const getTrainingList = createAsyncThunk(
  "calendar/getTrainingList",
  async (_, { rejectWithValue }) => {
    try {
      return await tables.trainingCalendar.findAll();
    } catch (error) {
      return rejectWithValue("Error to get the training list");
    }
  }
);

export const removeTraining = createAsyncThunk(
  "calendar/deleteTraining",
  async (id: string, { rejectWithValue }) => {
    try {
      await tables.trainingCalendar.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue("Error to get the training list");
    }
  }
);

export const createTraining = createAsyncThunk(
  "calendar/createTraining",
  async (training: Omit<Training, "id">, { rejectWithValue }) => {
    try {
      const p = await tables.trainingCalendar.insert(training);
      return p;
    } catch (error) {
      return rejectWithValue("Error to insert the training");
    }
  }
);

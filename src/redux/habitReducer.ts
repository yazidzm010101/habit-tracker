import { CategoryRecord, HabitRecord } from "../database/model";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

import db from "../database/database";
import { whereInAnd } from "../database/query";

export const getHabitsByCategories = createAsyncThunk(
  "habits/getGroupsById",
  async (category: CategoryRecord) => {
    let categories: CategoryRecord[] = await whereInAnd(
      db,
      "habit_category",
      "id",
      [category.id]
    );
    let habits: HabitRecord[] = [];
    if (categories.length > 0) {
      habits = await whereInAnd(
        db,
        "habit_list",
        "habit_category",
        categories[0].habits
      );
    }
    return habits as HabitRecord[];
  }
);

export const habitAdapter = createEntityAdapter<HabitRecord>();

const initialState = habitAdapter.getInitialState({
  status: "idle",
  message: "",
});

export const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHabitsByCategories.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getHabitsByCategories.fulfilled, (state, action) => {
      state.status = "ready";
      habitAdapter.upsertMany(state, action.payload);
    });
    builder.addCase(getHabitsByCategories.rejected, (state) => {
      state.status = "error";
      state.message = "An error happened while fetching the data!";
    });
  },
});

export default habitSlice.reducer;

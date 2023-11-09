import { CategoryRecord, HabitRecord } from "../database/model";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

import db from "../database/database";
import { whereInAnd } from "../database/query";

export const getHabitsByCategory = createAsyncThunk(
  "habits/getByCategory",
  async (id: number) => {
    const category: CategoryRecord = await (await db).get("habit_category", id);
    let habits: HabitRecord[] = [];
    if (category) {
      habits = await whereInAnd(db, "habit_list", "category", [id]);
    }
    return habits as HabitRecord[];
  }
);

export const habitAdapter = createEntityAdapter<HabitRecord>();

const initialState = habitAdapter.getInitialState();

export const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHabitsByCategory.fulfilled, habitAdapter.upsertMany);
  },
});

export default habitSlice.reducer;

import { CategoryRecord, HabitRecord } from "../database/model";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { getAll, whereInAnd } from "../database/query";

import db from "../database/database";

export const getHabitCategories = createAsyncThunk(
  "categories/getAll",
  async () => {
    let categories: CategoryRecord[] = await getAll(db, "habit_category");
    let habits: HabitRecord[] = await whereInAnd(
      db,
      "habit_list",
      "category",
      categories.map((ctg) => ctg.id)
    );
    categories = categories.map((ctg) => {
      let currHabits: any[] = [];
      currHabits = habits.filter((habit) => habit.category == ctg.id);
      currHabits = currHabits.sort(
        (habit: HabitRecord, nextHabit: HabitRecord) => {
          if (typeof habit.order == "number") {
            return typeof nextHabit.order == "number"
              ? habit.order > nextHabit.order
                ? 1
                : -1
              : -1;
          }
          if (typeof nextHabit.order == "number") {
            return typeof habit.order == "number"
              ? habit.order > nextHabit.order
                ? 1
                : -1
              : -1;
          }
          return 1;
        }
      );
      currHabits = currHabits.map((habit: HabitRecord): number => habit.id);
      ctg.habits = currHabits;
      return ctg;
    });
    return categories as CategoryRecord[];
  }
);

export const getHabitCategoryById = createAsyncThunk(
  "categories/getById",
  async (id: number) => {
    let category: CategoryRecord = await (await db).get("habit_category", id);
    let habits: HabitRecord[] = await whereInAnd(db, "habit_list", "category", [
      id,
    ]);
    habits = habits.sort((habit: HabitRecord, nextHabit: HabitRecord) => {
      if (typeof habit.order == "number") {
        return typeof nextHabit.order == "number"
          ? habit.order > nextHabit.order
            ? 1
            : -1
          : -1;
      }
      if (typeof nextHabit.order == "number") {
        return typeof habit.order == "number"
          ? habit.order > nextHabit.order
            ? 1
            : -1
          : -1;
      }
      return 1;
    });
    category.habits = habits.map((habit: HabitRecord): number => habit.id);
    return category as CategoryRecord;
  }
);

export const addHabitCategory = createAsyncThunk(
  "categories/add",
  async ({ name }: { name: string }) => {
    const id = await (await db).add("habit_category", { name, habits: [] });
    return {
      id,
      name,
      habits: [],
    } as CategoryRecord;
  }
);

export const removeHabitCategory = createAsyncThunk(
  "categories/remove",
  async (id: number) => {
    const category = (await (
      await db
    ).get("habit_category", id)) as CategoryRecord;
    const habits = (await whereInAnd(db, "habit_list", "category", [
      category.id,
    ])) as HabitRecord[];
    await Promise.all(
      habits.map(async (habit) => {
        return (await db).delete("habit_list", habit.id);
      })
    );
    (await db).delete("habit_category", id);
    return category;
  }
);

export const updateHabitCategory = createAsyncThunk(
  "categories/update",
  async (record: CategoryRecord) => {
    await (await db).put("habit_category", record);
    return record as CategoryRecord;
  }
);

export const habitCategoryAdapter = createEntityAdapter<CategoryRecord>();

type statusType = { status: "ready" | "pending" | "error" };
const initialState = habitCategoryAdapter.getInitialState({
  status: "ready",
} as statusType);

export const habitCategorySlice = createSlice({
  name: "habitCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHabitCategories.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getHabitCategories.fulfilled, (state, action) => {
      habitCategoryAdapter.removeAll(state);
      habitCategoryAdapter.upsertMany(state, action);
      state.status = "ready";
    });
    builder.addCase(getHabitCategories.rejected, (state) => {
      state.status = "error";
    });
    builder.addCase(
      getHabitCategoryById.fulfilled,
      habitCategoryAdapter.upsertOne
    );
    builder.addCase(addHabitCategory.fulfilled, habitCategoryAdapter.upsertOne);
    builder.addCase(
      updateHabitCategory.fulfilled,
      habitCategoryAdapter.upsertOne
    );
    builder.addCase(removeHabitCategory.fulfilled, (state, action) => {
      habitCategoryAdapter.removeOne(state, action.payload.id);
    });
  },
});

export default habitCategorySlice.reducer;

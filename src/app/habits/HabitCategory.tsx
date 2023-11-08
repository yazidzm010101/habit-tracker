import { RiAddCircleLine, RiEdit2Line } from "react-icons/ri";
import { RootState, useAppDispatch } from "../../redux/store";
import { getHabitsByCategory, habitAdapter } from "../../redux/habitReducer";
import { useEffect, useState } from "react";

import { CategoryRecord } from "../../database/model";
import { getHabitCategoryById } from "../../redux/habitCategoryReducer";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { useSelector } from "react-redux";

function HabitCategory({
  category,
  className,
}: {
  category: CategoryRecord;
  className?: string;
}) {
  const dispatch = useAppDispatch();

  const [state, setState] = useState("idle");
  const { selectEntities } = habitAdapter.getSelectors(
    (state: RootState) => state.habits
  );

  let habitEntities = useSelector(selectEntities);
  let habits = category.habits.map((id) => {
    let habit = habitEntities[id];
    return habit;
  });

  useEffect(() => {
    if (state == "idle") {
      setState("pending");
      dispatch(getHabitCategoryById(category.id))
        .then(async () => {
          await dispatch(getHabitsByCategory(category.id));
          setState("ready");
        })
        .catch(() => setState("error"));
    }
  }, [state, dispatch]);

  return (
    <div
      className={twMerge("w-10rem max-w-full px-4 py-4", className)}
      key={String(category.id)}
    >
      <div className="w-full h-full border shadow-sm rounded-xl">
        <div className="flex items-center w-full">
          <h5 className="px-4 py-3 font-bold text-gray-700">{category.name}</h5>
          <button className="flex-shrink-0 px-2 py-2 ml-auto h-max">
            <RiEdit2Line className={"w-6 h-6"} />
          </button>
        </div>
        <hr />
        <div className="px-3 child:my-3">
          {state == "pending" && (
            <>
              <motion.div
                transition={{ duration: 2, repeat: Infinity }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                className="w-full h-8 bg-gray-300 rounded-xl"
              />
              <motion.div
                transition={{ duration: 2, repeat: Infinity }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                className="w-full h-8 bg-gray-300 rounded-xl"
              />
              <motion.div
                transition={{ duration: 2, repeat: Infinity }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                className="w-full h-8 bg-gray-300 rounded-xl"
              />
            </>
          )}
          {state == "ready" &&
            habits.map((habit) => (
              <div
                key={habit?.id.toString()}
                className="flex items-center w-full px-2 py-2 text-gray-700 border shadow-sm rounded-xl"
              >
                {habit?.name}
              </div>
            ))}
          <div className="flex items-center w-full px-2 py-2 text-gray-500 transition-colors duration-200 border border-gray-200 border-dashed cursor-pointer rounded-xl hover:border-orange-400 hover:text-orange-400">
            <RiAddCircleLine className={"w-6 h-6 mr-3"} />
            Add new habit
          </div>
        </div>
      </div>
    </div>
  );
}

export function HabitCategoryAdder({ className }: { className?: string }) {
  return (
    <div className={twMerge("w-10rem max-w-full px-4 py-4", className)}>
      <div className="cursor-pointer hover:text-orange-400 hover:border-orange-400 transition-colors duration-200 flex items-center px-4 w-full text-gray-500 min-h-[3rem] border border-dashed rounded-xl shadow-sm">
        <RiAddCircleLine className={"w-6 h-6 mr-2"} />
        Add new category
      </div>
    </div>
  );
}

export function HabitCategorySkeleton({
  length = 3,
  className,
}: {
  length: number;
  className?: string;
}) {
  let skeletons: any[] = [];
  for (let i = 0; i < length; i++) {
    skeletons.push(
      <div
        className={twMerge("w-10rem max-w-full px-4 py-4", className)}
        key={"skeleton-" + i}
      >
        <div className="w-full border shadow-sm rounded-xl">
          <div className="w-full px-4 py-2">
            <motion.div
              transition={{ duration: 2, repeat: Infinity }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              className="w-full h-10 bg-gray-300 rounded-xl"
            />
          </div>
          <hr />
          <div className="px-3 child:my-3">
            <motion.div
              transition={{ duration: 2, repeat: Infinity }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              className="w-full h-8 bg-gray-300 rounded-xl"
            />
            <motion.div
              transition={{ duration: 2, repeat: Infinity }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              className="w-full h-8 bg-gray-300 rounded-xl"
            />
            <motion.div
              transition={{ duration: 2, repeat: Infinity }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              className="w-full h-8 bg-gray-300 rounded-xl"
            />
          </div>
        </div>
      </div>
    );
  }
  return skeletons;
}

export default HabitCategory;

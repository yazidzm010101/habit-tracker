import HabitCategory, {
  HabitCategoryAdder,
  HabitCategorySkeleton,
} from "./HabitCategory";
import { RootState, useAppDispatch } from "../../redux/store";
import {
  getHabitCategories,
  habitCategoryAdapter,
} from "../../redux/habitCategoryReducer";
import { useEffect, useState } from "react";

import LayoutContent from "../../components/LayoutContent";
import { useSelector } from "react-redux";

function HabitPage() {
  const dispatch = useAppDispatch();
  const [state, setState] = useState("idle");
  const { selectAll } = habitCategoryAdapter.getSelectors(
    (state: RootState) => state.habitCategories
  );
  const habitCategories = useSelector(selectAll);

  useEffect(() => {
    if (state == "idle") {
      setState("pending");
      dispatch(getHabitCategories())
        .then(() => setState("ready"))
        .catch(() => setState("error"));
    }
  }, [state, dispatch]);

  return (
    <LayoutContent>
      <div className="container py-4 mx-auto md:px-4">
        <div className="flex flex-wrap py-4 h-max child:w-full child:lg:w-1/2 child:xl:w-1/3 child:2xl:w-1/4 child:max-w-full child:flex-shrink-0">
          {state == "pending" && <HabitCategorySkeleton length={3} />}
          {state == "ready" &&
            habitCategories.map((ctg) => (
              <HabitCategory key={ctg.id} category={ctg} />
            ))}
          <HabitCategoryAdder />
        </div>
      </div>
    </LayoutContent>
  );
}

export default HabitPage;

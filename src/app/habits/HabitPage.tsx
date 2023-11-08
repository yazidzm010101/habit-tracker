import { RootState, useAppDispatch } from "../../redux/store";
import {
  getHabitCategories,
  habitCategoryAdapter,
} from "../../redux/habitCategoryReducer";

import HabitCategory from "./HabitCategory";
import LayoutContent from "../../components/LayoutContent";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function HabitPage() {
  const dispatch = useAppDispatch();
  const { status } = useSelector((state: RootState) => state.habitCategories);
  const { selectAll } = habitCategoryAdapter.getSelectors(
    (state: RootState) => state.habitCategories
  );
  const habitCategories = useSelector(selectAll);

  useEffect(() => {
    if (status == "idle") {
      dispatch(getHabitCategories());
    }
  }, [status, dispatch]);

  console.log(habitCategories);

  return (
    <LayoutContent>
      <div className="container px-4 py-4 mx-auto">
        <div className="flex py-4 overflow-x-auto h-max">
          {habitCategories.map((ctg) => (
            <HabitCategory key={ctg.id} category={ctg} />
          ))}
        </div>
      </div>
    </LayoutContent>
  );
}

export default HabitPage;

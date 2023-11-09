import { RootState, useAppDispatch } from "../../redux/store";
import {
  getHabitCategories,
  habitCategoryAdapter,
} from "../../redux/habitCategoryReducer";

import Category from "./Category";
import CategoryAdd from "./CategoryAdd";
import CategorySkeleton from "./CategorySkeleton";
import LayoutContent from "../../components/LayoutContent";
import { useEffect } from "react";
import { useSelector } from "react-redux";

type stateType = "pending" | "ready" | "error";

function HabitPage() {
  const dispatch = useAppDispatch();
  const status: stateType = useSelector(
    (state: RootState) => state.habitCategories.status
  );
  const { selectAll } = habitCategoryAdapter.getSelectors(
    (state: RootState) => state.habitCategories
  );
  const habitCategories = useSelector(selectAll);

  useEffect(() => {
    dispatch(getHabitCategories());
  }, []);

  return (
    <LayoutContent>
      <div className="container py-4 mx-auto md:px-4">
        <div className="flex flex-wrap py-4 h-max child:w-full child:lg:w-1/2 child:xl:w-1/3 child:2xl:w-1/4 child:max-w-full child:flex-shrink-0">
          {status == "pending" && <CategorySkeleton length={3} />}
          {status == "ready" &&
            habitCategories.map((ctg) => (
              <Category key={ctg.id} category={ctg} />
            ))}
          <CategoryAdd />
        </div>
      </div>
    </LayoutContent>
  );
}

export default HabitPage;

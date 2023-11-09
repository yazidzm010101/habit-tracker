import { CategoryRecord, HabitRecord } from "../../database/model";
import { RiDeleteBin2Line, RiEdit2Line } from "react-icons/ri";
import { RootState, useAppDispatch } from "../../redux/store";
import {
  getHabitCategoryById,
  updateHabitCategory,
} from "../../redux/habitCategoryReducer";
import { getHabitsByCategory, habitAdapter } from "../../redux/habitReducer";
import { useEffect, useRef, useState } from "react";

import CategoryRemove from "./CategoryRemove";
import Habit from "./Habit";
import HabitAdd from "./HabitAdd";
import Skeleton from "../../components/Skeleton";
import { twMerge } from "tailwind-merge";
import { useDisclosure } from "../../hooks/useDisclosure";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useSelector } from "react-redux";

type stateType = "idle" | "pending" | "ready" | "error";

function Category({
  category: initialData,
  className,
}: {
  category: CategoryRecord;
  className?: string;
}) {
  const dispatch = useAppDispatch();
  const headerRef = useRef(null);
  const [category, setCategory] = useState(initialData);
  const [state, setState] = useState<stateType>("idle");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const removeDisc = useDisclosure();
  const { selectEntities } = habitAdapter.getSelectors(
    (state: RootState) => state.habits
  );

  const habitEntities = useSelector(selectEntities);
  const habits = category.habits.map((id) => {
    const habit = habitEntities[id];
    return habit as HabitRecord;
  });

  const onUpdate = () => {
    if (category.name != initialData.name) {
      setState("pending");
      dispatch(updateHabitCategory(category))
        .then(async () => {
          await dispatch(getHabitCategoryById(category.id));
          await dispatch(getHabitsByCategory(category.id));
          setState("ready");
          setIsEdit(false);
        })
        .catch(() => {
          setState("error");
          setCategory(initialData);
          setIsEdit(false);
        });
    } else {
      setIsEdit(false);
    }
  };
  
  useOutsideClick(headerRef, () => {if(isEdit) {onUpdate()}})

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
        <div className="flex items-center w-full" ref={headerRef}>
          {!isEdit ? (
            <h5 className="px-4 py-3 font-bold text-gray-700">
              {category.name}
            </h5>
          ) : (
            <form
              className="px-2 py-1 text-gra-700 w-full"
              onSubmit={(e) => {
                e.preventDefault();
                onUpdate();
              }}
            >
              <input
                autoFocus={true}
                className="outline-none w-full border rounded-lg focus:border-orange-400 px-2 py-2"
                value={category.name || ""}
                onChange={(e) =>
                  setCategory({ ...category, name: e.target.value })
                }
              />
            </form>
          )}
          {!isEdit ? (
            <button
              className="flex-shrink-0 px-2 py-2 ml-auto h-max"
              onClick={() => setIsEdit(true)}
            >
              <RiEdit2Line className={"w-6 h-6"} />
            </button>
          ) : (
            <button className="flex-shrink-0 px-2 py-2 ml-auto h-max" onClick={() => {removeDisc.onOpen()}}>
              <RiDeleteBin2Line className={"w-6 h-6"} />
            </button>
          )}
        </div>
        <hr />
        <div className="px-3 child:my-3">
          {state == "pending" && <Skeleton noOfLines={3} className="w-full" />}
          {state == "ready" &&
            habits.map((habit) => <Habit key={habit.id} data={habit} />)}
          <HabitAdd />
          <CategoryRemove category={category} isOpen={removeDisc.isOpen} onClose={removeDisc.onClose}/>
        </div>
      </div>
    </div>
  );
}

export default Category;

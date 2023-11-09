import { AnimatePresence, motion } from "framer-motion";
import {
    getHabitCategories,
    removeHabitCategory,
} from "../../redux/habitCategoryReducer";
import { useRef, useState } from "react";

import { CategoryRecord } from "../../database/model";
import Portal from "../../components/Portal";
import { RiCloseLine } from "react-icons/ri";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../redux/store";
import { useTrapFocus } from "../../hooks/useTrapFocus";

type stateType = "idle" | "pending" | "success" | "error";

function CategoryRemove({
  category,
  isOpen,
  onClose,
}: {
  category: CategoryRecord;
  isOpen?: boolean;
  onClose: any;
}) {
  const dispatch = useAppDispatch();
  const [state, setState] = useState<stateType>("idle");
  const ref = useRef<any>(null);

  const onSubmit = (e: any) => {
    e.preventDefault();
    setState("pending");
    dispatch(removeHabitCategory(category.id))
      .then(() => {
        setState("success");
        dispatch(getHabitCategories());
        toast.success(`Success removing "${category.name}" category`, {
          position: "top-center",
          className: "md:ml-[300px]",
        });
        onClose();
      })
      .catch((err) => {
        toast.error(`Error removing "${category.name}" category`, {
          position: "top-center",
          className: "md:ml-[300px]",
        });
        setState("error");
      });
  };

  useTrapFocus({
    ref: ref,
    dependencies: [isOpen],
    condition: isOpen,
    onEscape: onClose,
  });

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <div className="flex items-center justify-center fixed left-0 md:left-[300px] right-0 top-0 bottom-0">
            <motion.div
              tabIndex={-1}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="w-full sm:max-w-sm h-full sm:h-auto bg-white rounded-xl shadow-md flex-shrink-0 sm:mb-96 border"
              ref={ref}
            >
              <div className="w-full flex items-center">
                <h5 className="px-4 py-2 text-lg text-gray-700">
                  Remove category
                </h5>
                <button
                  className="flex-shrink-0 ml-auto p-2 rounded-full"
                  onClick={onClose}
                >
                  <RiCloseLine className={"w-6 h-6"} />
                </button>
              </div>
              <hr />
              <form
                className="w-full flex flex-col child:my-3 px-4"
                autoComplete={"off"}
                onSubmit={onSubmit}
              >
                <p>
                  Are you sure want to remove category "{category.name}"? All of
                  the habits within it will also be removed!
                </p>
                <button
                  type="submit"
                  disabled={state == "pending"}
                  className="bg-red-400 rounded-xl px-4 py-2 w-max ml-auto text-white font-bold hover:bg-red-500 transition-colors"
                >
                  Remove
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Portal>
  );
}

export default CategoryRemove;

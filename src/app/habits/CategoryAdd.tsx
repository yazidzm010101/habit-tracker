import { AnimatePresence, motion } from "framer-motion";
import { RiAddCircleLine, RiCloseLine } from "react-icons/ri";
import { useRef, useState } from "react";

import Portal from "../../components/Portal";
import { addHabitCategory } from "../../redux/habitCategoryReducer";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import { useAppDispatch } from "../../redux/store";
import { useDisclosure } from "../../hooks/useDisclosure";
import { useTrapFocus } from "../../hooks/useTrapFocus";

function CategoryAdd({ className }: { className?: string }) {
  const addDisc = useDisclosure();
  return (
    <>
      <div className={twMerge("w-10rem max-w-full px-4 py-4", className)}>
        <div
          className="cursor-pointer hover:text-orange-400 hover:border-orange-400 transition-colors duration-200 flex items-center px-4 w-full text-gray-500 min-h-[3rem] border border-dashed rounded-xl shadow-sm"
          onClick={addDisc.onOpen}
        >
          <RiAddCircleLine className={"w-6 h-6 mr-2"} />
          Add new category
        </div>
      </div>
      <AddModal isOpen={addDisc.isOpen} onClose={addDisc.onClose} />
    </>
  );
}

type addStateType = "idle" | "pending" | "success" | "error";

function AddModal({ isOpen, onClose }: { isOpen?: boolean; onClose: any }) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<any>({});
  const [state, setState] = useState<addStateType>("idle");
  const ref = useRef<any>(null);

  const onSubmit = (e: any) => {
    e.preventDefault();
    setState("pending");
    dispatch(addHabitCategory(form)).then(() => {
      setState("success")
      toast.success(`Success adding "${form.name}" category`, {position: "top-center", className: "md:ml-[300px]"})
      onClose();
    }).catch(_err => {
      toast.error(`Error adding "${form.name}" category`, {position: "top-center", className: "md:ml-[300px]"})
      setState("error");
      onClose();
    })
    
  }

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
                  Add new category
                </h5>
                <button
                  className="flex-shrink-0 ml-auto p-2 rounded-full"
                  onClick={onClose}
                >
                  <RiCloseLine className={"w-6 h-6"} />
                </button>
              </div>
              <hr />
              <form className="w-full flex flex-col child:my-3 px-4" autoComplete={"off"} onSubmit={onSubmit}>
                <fieldset className="flex flex-col w-full">
                  <label
                    htmlFor={"name"}
                    className="text-sm mb-1 ml-1 text-gray-600"
                  >
                    Name
                  </label>
                  <input
                    className="py-2 rounded-md px-2 outline-none border focus:border-orange-400 transition-colors duration-200"
                    type="text"
                    id="name"
                    name="name"
                    value={form?.name || ""}
                    disabled={state == "pending"}
                    onChange={(el) =>
                      setForm({ ...form, [el.target.name]: el.target.value })
                    }
                  />
                </fieldset>
                <button
                  type="submit"
                  disabled={state == "pending"}
                  className="bg-orange-400 rounded-xl px-4 py-2 w-max ml-auto text-white font-bold hover:bg-orange-500 transition-colors"
                >
                  Add
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Portal>
  );
}

export default CategoryAdd;

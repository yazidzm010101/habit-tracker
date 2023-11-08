import { RiAddCircleLine, RiEdit2Line } from "react-icons/ri";

import { CategoryRecord } from "../../database/model";

function HabitCategory({ category }: { category: CategoryRecord }) {
  return (
    <div
      className="flex-shrink-0 w-full max-w-sm px-4"
      key={String(category.id)}
    >
      <div className="w-full border rounded-md shadow-sm">
        <div className="flex items-center w-full">
          <h5 className="px-4 py-3 font-bold text-gray-700">{category.name}</h5>
          <button className="flex-shrink-0 px-2 py-2 ml-auto h-max">
            <RiEdit2Line className={"w-6 h-6"} />
          </button>
        </div>
        <hr />
        <div className="px-3 child:my-3">
          <div className="flex items-center w-full px-2 py-2 text-gray-500 transition-colors duration-200 border border-gray-200 border-dashed rounded-md cursor-pointer hover:border-red-400 hover:text-red-400">
            <RiAddCircleLine className={"w-6 h-6 mr-3"} />
            Add new habit
          </div>
        </div>
      </div>
    </div>
  );
}

export default HabitCategory;

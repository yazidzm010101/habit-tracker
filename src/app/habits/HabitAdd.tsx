import { RiAddCircleLine } from "react-icons/ri";

function HabitAdd() {
  return (
    <div className="flex items-center w-full px-2 py-2 text-gray-500 transition-colors duration-200 border border-gray-200 border-dashed cursor-pointer rounded-xl hover:border-orange-400 hover:text-orange-400">
      <RiAddCircleLine className={"w-6 h-6 mr-3"} />
      Add new habit
    </div>
  );
}

export default HabitAdd;

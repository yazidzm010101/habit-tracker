import { HabitRecord } from "../../database/model";

function Habit({ data }: { data: HabitRecord }) {
  return (
    <div className="flex items-center w-full px-2 py-2 text-gray-700 border shadow-sm rounded-xl">
      {data.name}
    </div>
  );
}

export default Habit;

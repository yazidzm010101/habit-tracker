import { AnimatePresence, motion } from "framer-motion";
import { addDays, format, startOfToday, subDays } from "date-fns";
import { useEffect, useState } from "react";

import LayoutContent from "../../components/LayoutContent";
import { faker } from "@faker-js/faker";

const data = [];
for (let i = 0; i < 10; i++) {
  data.push({
    id: faker.database.mongodbObjectId(),
    name: faker.internet.emoji() + " " + faker.lorem.lines({ min: 1, max: 2 }),
  });
}

function ProgressTracker() {
  const [active, setActive] = useState(startOfToday());
  const [days, setDays] = useState<any[]>([]);

  useEffect(() => {
    // scroll mode
    if (true) {
      let newDays = [];
      for (let i = 5; i >= 1; i--) {
        let currTs = subDays(new Date(active), i);
        let currDate = format(currTs, "d");
        newDays.push(
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={currTs.getTime().toString()}
            onClick={() => setActive(currTs)}
            layout
            layoutId={currTs.getTime().toString()}
            className="flex flex-col items-center justify-center"
          >
            <span className="text-gray-500">{format(currTs, "EEEEEE")}</span>
            <span className="flex flex-col items-center justify-center w-12 h-12 font-bold bg-white border rounded-full">
              {currDate}
            </span>
          </motion.span>
        );
      }
      newDays.push(
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          key={active.getTime().toString()}
          layout
          layoutId={active.getTime().toString()}
          className="flex flex-col items-center justify-center"
        >
          <span className="text-gray-500">{format(active, "EEEEEE")}</span>
          <span className="flex flex-col items-center justify-center w-12 h-12 font-bold text-white bg-red-500 border rounded-full">
            {format(active, "d")}
          </span>
        </motion.span>
      );
      for (let i = 1; i <= 5; i++) {
        let currTs = addDays(new Date(active), i);
        let currDate = format(currTs, "d");
        newDays.push(
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={currTs.getTime().toString()}
            onClick={() => setActive(currTs)}
            layout
            layoutId={currTs.getTime().toString()}
            className="flex flex-col items-center justify-center"
          >
            <span className="text-gray-500">{format(currTs, "EEEEEE")}</span>
            <span className="flex flex-col items-center justify-center w-12 h-12 font-bold bg-white border rounded-full">
              {currDate}
            </span>
          </motion.span>
        );
      }
      setDays(newDays);
    }
  }, [active]);

  return (
    <LayoutContent>
      <div className="container px-4 py-4 mx-auto">
        <div className="relative flex flex-row justify-center w-full overflow-hidden child:mx-1 child:flex-shrink-0 child:cursor-pointer">
          <AnimatePresence mode="popLayout">{days}</AnimatePresence>
        </div>
      </div>
    </LayoutContent>
  );
}

export default ProgressTracker;

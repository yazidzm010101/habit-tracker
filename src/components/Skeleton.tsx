import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

function Skeleton({
  className,
  noOfLines = 1,
}: {
  className?: string;
  noOfLines?: number;
}) {
  let skeletons = [];
  for (let i = 0; i < noOfLines; i++) {
    skeletons.push(
      <motion.div
        key={i}
        transition={{ duration: 2, repeat: Infinity }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        className={twMerge(
          "w-[10rem] my-1 h-8 bg-gray-300 rounded-xl",
          className
        )}
      />
    );
  }
  return skeletons;
}

export default Skeleton;

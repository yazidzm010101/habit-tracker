import { ReactElement } from "react";
import { motion } from "framer-motion";

type Props = {
    children: string | JSX.Element | JSX.Element[] | ReactElement | ReactElement[]
  }

function LayoutContent({ children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}

export default LayoutContent;

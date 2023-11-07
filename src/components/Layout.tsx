import { AnimatePresence, motion } from "framer-motion";
import { Link, Outlet, useLocation } from "react-router-dom";
import paths, { PathKey, pathOrders } from "../routes/paths";

import { twMerge } from "tailwind-merge";

function Layout() {
  const { pathname } = useLocation();
  const isActive = (currPathname: string) => {
    return pathname.startsWith(currPathname);
  };
  return (
    <>
      <nav className="fixed flex-col flex top-0 left-0 w-[300px] h-full bg-white dark:bg-gray-800 border-r border-r-gray-200">
        <div className="w-full px-4 py-4">
          <Link to={"/"} className="w-full">
            HabitTracker
          </Link>
        </div>
        <ul className="flex flex-col px-2 text-lg">
          {pathOrders.map((pathName: PathKey) => (
            <li className="relative w-full my-1" key={pathName}>
              {
                isActive(paths[pathName].path) && (
                  <motion.div layoutId="sidebar-active-bar" className="absolute top-0 left-0 w-full h-full border rounded-md shadow-sm bg-gray-50"/>
                )
              }
              <Link
                to={paths[pathName].path}
                className={twMerge(
                  "flex items-center px-3 py-2.5 relative z-[1] border border-transparent hover:border-red-300 rounded-md transition-colors duration-200",
                  isActive(paths[pathName].path)
                    ? " text-red-500"
                    : "text-gray-600"
                )}
              >
                {paths[pathName].icon({ className: "w-5 h-5 mr-4" })}
                {paths[pathName].name}
                
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div id="content" className="h-full overflow-y-auto pl-[300px]">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

export default Layout;

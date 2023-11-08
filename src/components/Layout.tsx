import { AnimatePresence, motion } from "framer-motion";
import { Link, Outlet, useLocation } from "react-router-dom";
import paths, { PathKey, pathOrders } from "../routes/paths";

import squaredot from "../assets/squaredot.svg";
import { twMerge } from "tailwind-merge";

function SideBar() {
  const { pathname } = useLocation();
  const isActive = (currPathname: string) => {
    return pathname.startsWith(currPathname);
  };
  return (
    <nav className="fixed flex-col hidden md:flex top-0 left-0 md:w-[300px] h-full bg-white dark:bg-gray-800 border-r border-r-gray-200">
      <div className="w-full px-6 py-4 text-2xl text-center">
        <Link to={"/"} className="relative font-bold font-sans_condensed">
          <div
            style={{
              backgroundImage: `url('${squaredot}')`,
              maskImage: "radial-gradient(black, transparent)",
              WebkitMaskImage: "radial-gradient(black, transparent)",
            }}
            className="absolute top-1/2 -translate-y-1/2 -left-1/4 w-16 h-16 bg-[length:80px] bg-repeat opacity-30"
          />
          Habit<span className="text-orange-600">Tracker</span>
        </Link>
      </div>
      <div className="w-full h-[1px] mb-2" style={{background: "linear-gradient(to right, transparent, rgb(0 0 0 / 0.2), transparent)"}}/>
      <ul className="flex flex-col px-2 text-lg">
        {pathOrders.map((pathName: PathKey) => (
          <li className="relative w-full my-1" key={pathName}>
            {isActive(paths[pathName].path) && (
              <motion.div
                layoutId="sidebar-active-bar"
                className="absolute top-0 left-0 w-full h-full border shadow-sm rounded-xl bg-gray-50"
              />
            )}
            <Link
              to={paths[pathName].path}
              className={twMerge(
                "flex items-center px-3 py-2.5 relative z-[1] border border-transparent hover:border-orange-400 rounded-xl transition-colors duration-200",
                isActive(paths[pathName].path)
                  ? " text-orange-500"
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
  );
}

function MobileAppBar() {
  const { pathname } = useLocation();
  const isActive = (currPathname: string) => {
    return pathname.startsWith(currPathname);
  };
  return (
    <nav className="fixed flex-row md:hidden flex bottom-0 left-0 w-full h-[4rem] bg-white dark:bg-gray-800 border-t border-t-gray-200">
      <ul className="flex flex-row w-full max-w-md px-2 mx-auto text-lg">
        {pathOrders.map((pathName: PathKey) => (
          <motion.li
            layout
            layoutId={pathName}
            className="flex items-center flex-1 flex-shrink-0 h-full px-1"
            key={pathName}
          >
            <div className="relative w-full h-full mx-auto min-w-max">
              {isActive(paths[pathName].path) && (
                <motion.span
                  layoutId="mobilebar-active-bar"
                  className="absolute top-0 left-0 flex justify-center w-full"
                >
                  <span className="block w-2/3 h-1 bg-orange-400 rounded-b-md" />
                </motion.span>
              )}
              <Link
                to={paths[pathName].path}
                className={twMerge(
                  "flex flex-col items-center h-full justify-center px-3 py-2.5 relative z-[1] border border-transparent hover:text-orange-400 rounded-xl transition-colors duration-200",
                  isActive(paths[pathName].path)
                    ? " text-orange-500 pt-4"
                    : "text-gray-600"
                )}
              >
                {paths[pathName].icon({ className: "w-5 h-5 flex-shrink-0" })}
                <AnimatePresence>
                  {" "}
                  {isActive(paths[pathName].path) && (
                    <motion.span
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs font-medium text-center sm:text-sm font-sans_condensed"
                    >
                      {paths[pathName].name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </div>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
}

function Layout() {
  return (
    <>
      <SideBar />
      <MobileAppBar />
      <div
        id="content"
        className="h-full overflow-y-auto md:pl-[300px] pb-16 md:pb-0"
      >
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

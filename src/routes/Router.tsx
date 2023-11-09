import { Navigate, Route, Routes } from "react-router-dom";

import Achievements from "../app/achievements/Achievements";
import HabitPage from "../app/habits/_index";
import Layout from "../components/Layout";
import ProgressTrackerPage from "../app/progress-tracker/ProgressTrackerPage";
import paths from "./paths";
import { useEffect } from "react";

function Router() {
  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.getItem("theme") == "dark") {
      document.documentElement.setAttribute("data-mode", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-mode");
      localStorage.setItem("theme", "light");
    }
  }, [localStorage.getItem("theme")]);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to={paths.habits.path} />} />
        <Route path={paths.habits.path} element={<HabitPage />} />
        <Route path={paths.todo.path} element={<Achievements />} />
        <Route path={paths.achievements.path} element={<Achievements />} />
        <Route
          path={paths.progress_tracker.path}
          element={<ProgressTrackerPage />}
        />
      </Route>
    </Routes>
  );
}

export default Router;

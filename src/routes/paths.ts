import {
  RiBarChartGroupedLine,
  RiMedalLine,
  RiStackLine,
  RiTodoLine
} from "react-icons/ri";

import { IconType } from "react-icons";

export interface PathType {
  name: string;
  path: string;
  icon: IconType;
}

export const pathOrders = [
  "progress_tracker",
  "habits",
  "todo",
  "achievements",
] as const;

export type PathKey = typeof pathOrders[number];

export type PathObject = {
  [key in PathKey]: PathType
}

const paths: PathObject = {
  habits: { name: "Habits", path: "/habits", icon: RiStackLine },
  todo: { name: "To-do", path: "/to-do", icon: RiTodoLine },
  achievements: {
    name: "Achievements",
    path: "/achievements",
    icon: RiMedalLine,
  },
  progress_tracker: {
    name: "Progress Tracker",
    path: "/progress-tracker",
    icon: RiBarChartGroupedLine,
  },
};

export default paths;

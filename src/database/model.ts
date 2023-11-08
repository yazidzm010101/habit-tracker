export type HabitRecord = {
  id: number;
  name: string;
  category: number;
  order?: number;
  unit?: string;
};

export type CategoryRecord = {
  id: number;
  name: string;
  habits: number[];
};

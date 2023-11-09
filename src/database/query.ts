import { IDBPDatabase } from "idb";
import { faker } from "@faker-js/faker";

type validStoreName = "habit_list" | "habit_category";

export const whereInAnd = async (
  db: Promise<IDBPDatabase>,
  storeName: validStoreName,
  column: string,
  values: any[]
): Promise<any[]> => {
  const store = (await db).transaction(storeName).store;
  let cursor: any = await store.openCursor();
  const res: any[] = [];
  cursor = await cursor?.continue();
  while (true) {
    const record = cursor.value;
    if (values.indexOf(record[column]) > -1) {
      res.push(record);
    }
    cursor = await cursor.continue();
    if (!cursor) {
      break;
    }
  }
  await new Promise((resolve) =>
    setTimeout(resolve, faker.number.int({ min: 50, max: 300 }))
  );
  return res;
};

export const getAll = async (
  db: Promise<IDBPDatabase>,
  storeName: validStoreName
): Promise<any[]> => {
  const store = (await db).getAll(storeName);
  await new Promise((resolve) =>
    setTimeout(resolve, faker.number.int({ min: 50, max: 300 }))
  );
  return store;
};

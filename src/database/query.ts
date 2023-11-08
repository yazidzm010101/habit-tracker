import { IDBPDatabase } from "idb";

type validStoreName = "habit_list" | "habit_category";

export const whereInAnd = async (
  db: Promise<IDBPDatabase>,
  storeName: validStoreName,
  column: string,
  values: any[]
): Promise<any[]> => {
  let store = (await db).transaction(storeName).store;
  let cursor: any = await store.openCursor();
  let res: any[] = [];
  cursor = await cursor?.continue();
  while (true) {
    let record = cursor.value;
    if (values.indexOf(record[column]) > -1) {
      res.push(record);
    }
    cursor = await cursor.continue();
    if (!cursor) {
      break;
    }
  }
  return res;
};

export const getAll = async (
  db: Promise<IDBPDatabase>,
  storeName: validStoreName
): Promise<any[]> => {
  let store = (await db).getAll(storeName);
//   (await db).close();
  return store;
};

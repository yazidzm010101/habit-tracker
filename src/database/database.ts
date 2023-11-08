import { openDB } from "idb";

const db = openDB("habit_tracker", 1, {
  async upgrade(db, _oldVersion, _newVersion, transaction) {
    await db.createObjectStore("habit_list", {
      keyPath: "id",
      autoIncrement: true,
    });
    await db.createObjectStore("habit_category", {
      keyPath: "id",
      autoIncrement: true,
    });

    // initiate first data
    await transaction.objectStore("habit_category").add({
      name: "Positive",
      order: 1,
      habits: [],
    });
    await transaction.objectStore("habit_category").add({
      name: "Negative",
      order: 2,
      habits: [],
    });

    // initiate first positive habits data
    await transaction.objectStore("habit_list").add({
      name: "🚶 Walk 1km",
      description: "❌📱 Turn off the screen, \n🏡 and enjoy the outdoor",
      category: 1,
    });

    await transaction.objectStore("habit_list").add({
      name: "💪 Push up 10x",
      description: "❌🛋️ Leave the comfy sofa, \n💪 and build up your strength",
      category: 1,
    });

    await transaction.objectStore("habit_list").add({
      name: "📘 Study for 30 minutes",
      description: "❌🎮 Stop the game, \n🧠 and feed your brain",
      category: 1,
    });

    await transaction
      .objectStore("habit_list")
      .getAll()
      .then(async (data) => {
        data = data.filter((item) => item.category == 1).map((item) => item.id);

        const group = await transaction
          .objectStore("habit_category")
          .get(1);

        await transaction.objectStore("habit_category").put({
          ...group,
          habits: data,
        });
      });

    // initiate negative
    await transaction.objectStore("habit_list").add({
      name: "🥱 Sleep late",
      description: "🥱 Staying up till midnight",
      category: 2,
    });

    await transaction.objectStore("habit_list").add({
      name: "🍕 Overeat",
      description: "🍕 Yummer, eating my own feeling",
      category: 2,
    });

    await transaction.objectStore("habit_list").add({
      name: "🫣 Hey dopamine",
      description: "🫣 Hey, what's your doing?",
      category: 2,
    });

    await transaction
      .objectStore("habit_list")
      .getAll()
      .then(async (data) => {
        data = data.filter((item) => item.category == 2).map((item) => item.id);

        const group = await transaction
          .objectStore("habit_category")
          .get(2);

        await transaction.objectStore("habit_category").put({
          ...group,
          habits: data,
        });
      });
  },
});

export default db;

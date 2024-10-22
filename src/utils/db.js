import { openDB } from "idb";

export const initDB = async () => {
  try {
    const db = await openDB("videoAnalysisDB", 1, {
      upgrade(db) {
        console.log("Upgrading database...");
        if (!db.objectStoreNames.contains("videos")) {
          db.createObjectStore("videos", { keyPath: "id" });
          console.log("Created 'videos' object store.");
        } else {
          console.log("'videos' object store already exists.");
        }
      },
    });
    console.log("Database initialized successfully.");
    return db;
  } catch (error) {
    console.error("Database initialization error:", error);
  }
};

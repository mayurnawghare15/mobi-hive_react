import { openDB } from "idb";

const DB_NAME = "LeadDataDB";
const STORE_NAME = "leadStore";
const DB_VERSION = 1;

export async function createData(data) {

  try {
    const db = await openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        }
      }
    });

    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    if (data.id) {
      const existingData = await store.get(data.id);
      if (existingData) {
        // Update existing data
        await store.put(data);
        console.log('Data updated:', data);
      } else {
        // Add new data
        await store.add(data);
        console.log('Data added:', data);
      }
    } else {
      // Add new data without ID
      await store.add(data);
      console.log('Data added:', data);
    }
    // await store.add(data);
  } catch (error) {
    console.error(error)
    console.log("Error in index DB")
  }
}

export async function readData(id) {
  const db = await openDB(DB_NAME, 1);
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  return await store.get(id);
}

export async function updateData(data) {
  const db = await openDB(DB_NAME, 1);
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  await store.put(data);
}

export async function deleteData(id) {
  const db = await openDB(DB_NAME, 1);
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  await store.delete(id);
}

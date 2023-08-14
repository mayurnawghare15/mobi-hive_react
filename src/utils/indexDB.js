import { openDB } from "idb";

const DB_NAME = "LeadDataDB";
const STORE_NAME = "leadStore";
const DB_VERSION = 1;

export async function createData(data) {

    const db = await openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
          }
        }
      });
    
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      await store.add(data);
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

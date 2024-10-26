class IndexedDBDatabase {
  private db: IDBDatabase | null = null;

  constructor(private dbName: string, private objectStoreName: string) { }

  async openDB(): Promise<IDBDatabase> {
    if (!this.db) {
      this.db = await new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, 1);

        request.onupgradeneeded = () => {
          const db = request.result;
          const objectStore = db.createObjectStore(this.objectStoreName, { keyPath: "key" });
        };

        request.onsuccess = () => {
          resolve(request.result);
        };

        request.onerror = () => {
          reject(request.error);
        };
      });
    }
    return this.db as IDBDatabase;
  }

  async addData(key: string, value: any): Promise<void> {
    const db = await this.openDB();
    const transaction = db.transaction([this.objectStoreName], "readwrite");
    const objectStore = transaction.objectStore(this.objectStoreName);

    const request = objectStore.add({ key, value });

    request.onsuccess = () => {
      console.log(`Data added successfully: ${key} = ${value}`);
    };

    request.onerror = () => {
      console.error(request.error);
    };
  }

  async deleteData(key: string): Promise<void> {
    const db = await this.openDB();
    const transaction = db.transaction([this.objectStoreName], "readwrite");
    const objectStore = transaction.objectStore(this.objectStoreName);

    const request = objectStore.delete(key);

    request.onsuccess = () => {
      console.log(`Data deleted successfully: ${key}`);
    };

    request.onerror = () => {
      console.error(request.error);
    };
  }

  async updateData(key: string, value: any): Promise<void> {
    const db = await this.openDB();
    const transaction = db.transaction([this.objectStoreName], "readwrite");
    const objectStore = transaction.objectStore(this.objectStoreName);

    const request = objectStore.put({ key, value });

    request.onsuccess = () => {
      console.log(`Data updated successfully: ${key} = ${value}`);
    };

    request.onerror = () => {
      console.error(request.error);
    };
  }

  async getData(key: string): Promise<any> {
    const db = await this.openDB();
    const transaction = db.transaction([this.objectStoreName], "readonly");
    const objectStore = transaction.objectStore(this.objectStoreName);
  
    const request = objectStore.get(key);
  
    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        const value = request.result;
        if (!value || !value.value) {
          console.log(`Data not found: ${key}`);
          resolve(null);
          return;
        }
        console.log(`Data retrieved successfully: ${key} = ${value}`);
        resolve(value.value);
      };
  
      request.onerror = () => {
        reject(request.error);
      };
    });
  }
}
const db = {
  save: new IndexedDBDatabase("save", "saves"),
}
export default db;
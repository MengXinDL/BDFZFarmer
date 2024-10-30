declare class IndexedDBDatabase {
    private dbName;
    private objectStoreName;
    private db;
    constructor(dbName: string, objectStoreName: string);
    openDB(): Promise<IDBDatabase>;
    addData(key: string, value: any): Promise<void>;
    deleteData(key: string): Promise<void>;
    updateData(key: string, value: any): Promise<void>;
    getData(key: string): Promise<any>;
}
declare const db: {
    save: IndexedDBDatabase;
};
export default db;

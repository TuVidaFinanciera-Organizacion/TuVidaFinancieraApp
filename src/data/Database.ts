import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('database.db');

export const createTables = () => {
    db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        icon TEXT,
        name TEXT,
        amount TEXT,
        date TEXT
      );`
        );
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tipo TEXT,
        fecha TEXT,
        monto REAL,
        nombre TEXT,
        category TEXT,
        FOREIGN KEY (category) REFERENCES categories(name)
      );`
        );
    });
};

export default db;
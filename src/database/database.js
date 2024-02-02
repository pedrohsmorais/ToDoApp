import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase("tododatabase.db");
  return db;
}

export { openDatabase };

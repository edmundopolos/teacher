import { UPDATE_GROUP } from "../actions/groupActions";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.db");

export default function groupReducer(state = [], { type, payload }) {
 
  switch (type) {
    case UPDATE_GROUP:

   
    console.log(payload)
      return payload;

    default:

      return state;
  }
}

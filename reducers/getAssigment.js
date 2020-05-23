import { Current } from "../actions/updateAssignments";
import * as SQLite from "expo-sqlite";


const db = SQLite.openDatabase("db.db");


export default function getAssigment(state = [], {type,payload}){
// console.log('reducer',state)type
    switch (type) {
        case Current: 
          console.log("pload",payload)
          return payload;
    
        default:
          
          return state;
      }

 }

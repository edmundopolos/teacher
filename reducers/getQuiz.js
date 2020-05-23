import { Current } from "../actions/updateQuiz";
import * as SQLite from "expo-sqlite";


const db = SQLite.openDatabase("db.db");


export default function getQuiz(state = [], {type,payload}){
// console.log('reducer',state)type
    switch (type) {
        case Current: 
          state= payload;
          return state;
    
        default:
          
          return state;
      }

 }

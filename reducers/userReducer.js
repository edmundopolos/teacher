import { UPDATE_PHOTO } from "../actions/updatePhoto";
import {Login} from "../actions/loginAction"

import Axios from "axios";
import { postBaseUrl } from "../components/requests";

import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.db");



export default function userReducer(state = '', { type, payload }) {
  var a =[] 
    
    switch (type) {

      case Login:
        console.log('log',payload)
        
        return payload
      case UPDATE_PHOTO:

        return payload;
  
      default:
          db.exec(
            [
              {
                sql: "select * from user",
                args: []
              }
            ],
            false,
            (tx, results) => {
              if (results[0].rows.length > 0) {
                a.push(results[0].rows[0]);
              }
              
            }
          );

          state = a
          // console.log(state)
        return state ;
    }
  }
  
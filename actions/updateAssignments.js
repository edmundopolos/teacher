export const Current = "student:updateAssignment";
import * as SQLite from "expo-sqlite";
import Axios from "axios";
import { postBaseUrl } from "../components/requests";


export const get =  (id) => {
  
  return dispatch =>{
 
       Axios.get(`${postBaseUrl}/assignment/class/${id}`,{timeout: 1000,
        headers: {'Content-Type': 'application/json'}})
        .then(function (response) {
          a = response.data
          if (response.status == 200 ) {
            
            
            dispatch(updateAssignment(response.data))
          }
           
        })
        .catch(function (error) {
          console.log(error)
          return error.status
        })

    
  }
}
  
export const add =  (payload, feedback) => {

         return dispatch =>{  
    Axios.post(`${postBaseUrl}/assignment/`, payload,{timeout: 1000,
      headers: {'Content-Type': 'application/json'}})
    .then(function (response) {
      console.log('post',response.data);
      if (response.status == 201 ) {
        feedback(true)
        dispatch(updateAssignment(response.data))
      }
       
    })
    .catch(function (error) {
      console.log(error);
    });
    }
      }
 


export default function updateAssignment(a) {
  
   

  
  return {
    type: Current,
    payload: a
  };
}
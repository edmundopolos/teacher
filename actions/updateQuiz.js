export const Current = "student:updateQuiz";
import * as SQLite from "expo-sqlite";
import Axios from "axios";
import { postBaseUrl } from "../components/requests";


export const get =  (id) => {
  
  return dispatch =>{
 
       Axios.get(`${postBaseUrl}/quiz/class/${id}`,{timeout: 1000,
        headers: {'Content-Type': 'application/json'}})
        .then(function (response) {
          a = response.data
          if (response.status == 200 ) {
            
            
            dispatch(updateQuiz(response.data))
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
    Axios.post(`${postBaseUrl}/quiz/`, payload,{
      headers: {'Content-Type': 'application/json'}})
    .then(function (response) {
      console.log('post',response.data);
      if (response.status == 201 ) {
        feedback(true)
        dispatch(updateQuiz(response.data))
      }
       
    })
    .catch(function (error) {
      console.log(error);
    });
    }
      }
 


export default function updateQuiz(a) {
  
   

  
  return {
    type: Current,
    payload: a
  };
}
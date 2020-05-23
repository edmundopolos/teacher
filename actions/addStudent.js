import { postBaseUrl } from "../components/requests";
import Axios from "axios";

export const ADD = "student:addStudent";

export const del = (id) => {
  
  return dispatch =>{
 
       Axios.delete(`${postBaseUrl}/student_group/${id}`,{
        headers: {'Content-Type': 'application/json'}})
        .then(function (response) {
          a = response.data
          if (response.status == 200 ) {
            Axios.get(`${postBaseUrl}/student_group/`,{timeout:2000,
              headers: {'Content-Type': 'application/json'}})
              .then(function (response) {
                a = response.data
                if (response.status == 200 ) {
                  
                  
                  dispatch(addStudent(response.data))
                }
                 
              })
              .catch(function (error) {
                console.log(error)
                return error.status
              })
      
          }
           
        })
        .catch(function (error) {
          console.log(error)
          return error.status
        })

    
  }
}



export const get =  () => {
  
  return dispatch =>{
 
       Axios.get(`${postBaseUrl}/student_group`,{timeout:2000,
        headers: {'Content-Type': 'application/json'}})
        .then(function (response) {
          a = response.data
          if (response.status == 200 ) {
            
            
            dispatch(addStudent(response.data))
          }
           
        })
        .catch(function (error) {
          console.log(error)
          return error.status
        })

    
  }
}
  
export const add =  (payload) => {

         return dispatch =>{  
    Axios.post(`${postBaseUrl}/student_group/`, payload,{timeout:2000,
      headers: {'Content-Type': 'application/json'}})
    .then(function (response) {
      // console.log('post',response.data);
      if (response.status == 201 ) {
        dispatch(addStudent(response.data))
      }
       
    })
    .catch(function (error) {
      console.log(error);
    });
    }
      }
 

export default function addStudent(student) {
  return {
    type: ADD,
    payload: student
  };
}

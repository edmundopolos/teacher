import Axios from "axios";
import { postBaseUrl } from "../components/requests";


export const MESSAGES = "message:updateMessages";


export const del = (id) => {
  
  return dispatch =>{
 
       Axios.delete(`${postBaseUrl}/message/${id}`,{
        headers: {'Content-Type': 'application/json'}})
        .then(function (response) {
          a = response.data
          if (response.status == 200 ) {
            Axios.get(`${postBaseUrl}/message`,{timeout:2000,
              headers: {'Content-Type': 'application/json'}})
              .then(function (response) {
                a = response.data
                if (response.status == 200 ) {
                  
                  
                  dispatch(updateGroup(response.data))
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
 
       Axios.get(`${postBaseUrl}/message`,{
        headers: {'Content-Type': 'application/json'}})
        .then(function (response) {
          a = response.data
          if (response.status == 200 ) {
            
            dispatch(updateMessages(response.data))
          }
           
        })
        .catch(function (error) {
          console.log(error)
          return error.status
        })

    
  }
}


export const getOne =  (id) => {
  
  return dispatch =>{
 
       Axios.get(`${postBaseUrl}/message/user/${id}`,{
        headers: {'Content-Type': 'application/json'}})
        .then(function (response) {
          a = response.data
          if (response.status == 200 ) {
            
            
            dispatch(updateMessages(response.data))
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
    Axios.post(`${postBaseUrl}/message/`, payload,{
      headers: {'Content-Type': 'application/json'}})
    .then(function (response) {
      // console.log('post',response.data);
      if (response.status == 201 ) {
        dispatch(updateMessages(response.data))
      }
       
    })
    .catch(function (error) {
      console.log(error);
    });
    }
      }
 

export default function updateMessages(payload) {
  // console.log("tre", payload);
  return {
    type: MESSAGES,
    payload: payload
  };
}

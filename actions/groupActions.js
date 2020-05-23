import Axios from "axios";
import { postBaseUrl } from "../components/requests";


export const UPDATE_GROUP = "group:updateGroup";


export const del = (id,feedback) => {
  
  return dispatch =>{
 
       Axios.delete(`${postBaseUrl}/class_group/${id}`,{
        headers: {'Content-Type': 'application/json'}})
        .then(function (response) {
          a = response.data
          if (response.status == 200 ) {
            Axios.get(`${postBaseUrl}/class_group`,{timeout:2000,
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
 
       Axios.get(`${postBaseUrl}/class_group`,{timeout:2000,
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
}
  
export const add =  (payload) => {

         return dispatch =>{  
    Axios.post(`${postBaseUrl}/class_group/`, payload,{
      headers: {'Content-Type': 'application/json'}})
    .then(function (response) {
      // console.log('post',response.data);
      if (response.status == 201 ) {
        dispatch(updateGroup(response.data))
      }
       
    })
    .catch(function (error) {
      console.log(error);
    });
    }
      }
 

export default function updateGroup(group) {
  // console.log("tre", group);
  return {
    type: UPDATE_GROUP,
    payload: group
  };
}

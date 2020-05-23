import Axios from "axios";
import { postBaseUrl } from "../components/requests";

export const Create_File = "file:createFile";

export const del = (id) => {
  
  return dispatch =>{
 
       Axios.delete(`${postBaseUrl}/file/${id}`,{
        headers: {'Content-Type': 'application/json'}})
        .then(function (response) {
          a = response.data
          if (response.status == 200 ) {
            Axios.get(`${postBaseUrl}/file`,{
              headers: {'Content-Type': 'application/json'}})
              .then(function (response) {
                
                if (response.status == 200 ) {
                  
                  
                  dispatch(createFile(response.data))
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
 
       Axios.get(`${postBaseUrl}/file`,{
        headers: {'Content-Type': 'application/json'}})
        .then(function (response) {
          a = response.data
          if (response.status == 200 ) {
            
            
            dispatch(createFile(response.data))
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
    Axios.post(`${postBaseUrl}/file/`, payload,{timeout:5000,
      headers: {'Content-Type': 'application/json'}})
    .then(function (response) {
      // console.log('post',response.data);
      if (response.status == 201 ) {
        dispatch(createFile(response.data))
      }
       
    })
    .catch(function (error) {
      console.log(error);
    });
    }
      }
 

export default function createFile(name) {
  return {
    type: Create_File,
    payload: name
  };
}

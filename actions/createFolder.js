import Axios from "axios";
import { postBaseUrl } from "../components/requests";

export const Create_Folder = "folder:createFolder";


export const get =  () => {
  
  return dispatch =>{
 
       Axios.get(`${postBaseUrl}/folder`,{timeout:2000,
        headers: {'Content-Type': 'application/json'}})
        .then(function (response) {
          a = response.data
          if (response.status == 200 ) {
            
            
            dispatch(createFolder(response.data))
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
    Axios.post(`${postBaseUrl}/folder/`, payload,{
      headers: {'Content-Type': 'application/json'}})
    .then(function (response) {
      console.log('post',response.data);
      if (response.status == 201 ) {
        dispatch(createFolder(response.data))
      }
       
    })
    .catch(function (error) {
      console.log(error);
    });
    }
      }
 


      export const del = (id) => {
  
        return dispatch =>{
       
             Axios.delete(`${postBaseUrl}/folder/${id}`,{
              headers: {'Content-Type': 'application/json'}})
              .then(function (response) {
                a = response.data
                if (response.status == 200 ) {
                  Axios.get(`${postBaseUrl}/folder`,{timeout:2000,
                    headers: {'Content-Type': 'application/json'}})
                    .then(function (response) {
                      a = response.data
                      if (response.status == 200 ) {
                        
                        
                        dispatch(createFolder(response.data))
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



export default function createFolder(name) {
  return {
    type: Create_Folder,
    payload: name
  };
}

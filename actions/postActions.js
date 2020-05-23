import * as SQLite from "expo-sqlite";
import axios,{post} from "axios";
import { postBaseUrl } from "../components/requests";
export const UPDATE_POST = "post:updatePost";

const db = SQLite.openDatabase("db.db");


export const get = () => {
  
  return dispatch =>{
 
       axios.get(`${postBaseUrl}/post`,{timeout:500,
        headers: {'Content-Type': 'application/json'}})
        .then(function (response) {
          a = response.data
          if (response.status == 200 ) {
            // console.log('get',a)
            dispatch(updatePost(response.data))
          }
          
           
        })
        .catch(function (error) {
          console.log(error)
          return error.status
        })

    
  }
}


export const del = (id,feedback) => {
  
  return dispatch =>{
 
       axios.delete(`${postBaseUrl}/post/${id}`,{timeout:2000,
        headers: {'Content-Type': 'application/json'}})
        .then(function (response) {
          a = response.data
          if (response.status == 200 ) {
            axios.get(`${postBaseUrl}/post`,{timeout:200,
              headers: {'Content-Type': 'application/json'}})
              .then(function (response) {
                a = response.data
                if (response.status == 200 ) {
                  console.log('get',a)
                  dispatch(updatePost(response.data))
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


  
export const add =  (payload) => {

         return dispatch =>{  
    axios.post(`${postBaseUrl}/post/`, payload)
    .then(function (response) {
      // console.log('post',response.data);
      if (response.status == 201 ) {
        dispatch(updatePost(response.data))
      }
       
    })
    .catch(function (error) {
      console.log(error);
    });
    
  
    }
      }
 

      export const addLike =  (payload,id) => {
        console.log('pay',payload)
        return dispatch =>{  
        axios.post(`${postBaseUrl}/like/${id}/`, payload)
        .then(function (response) {
          // console.log('post',response.data);
          if (response.status == 201 ) {
            dispatch(updatePost(response.data))
          }
      
   })
   .catch(function (error) {
     console.log(error);
   });
   
 
   }
     }

      
  export const addComment =  (payload,id) => {

        return dispatch =>{  
          // console.log("gdxgx",payload._id)
   axios.put(`${postBaseUrl}/post/comment/${id}/`, payload)
   .then(function (response) {
    //  console.log('post',response.data);
     if (response.status == 200 ) {
            console.log(response.data)
            dispatch(updatePost(response.data))
          }
          
           
        })
   .catch(function (error) {
     console.log(error);
   });
   
 
   }
     }
     export const deleteComment =  (id,payload) => {

      return dispatch =>{  
        // console.log("gdxgx",payload)
 axios.put(`${postBaseUrl}/comment/rmcomment/${id}/`, payload)
 .then(function (response) {
  //  console.log('post',response.data);
   if (response.status == 200 ) {
          // console.log(response.data)
          dispatch(updatePost(response.data))
        }
        
         
      })
 .catch(function (error) {
   console.log(error);
 });
 

 }
   }



export default function updatePost(post) {
  return {
    type: UPDATE_POST,
    payload: post
  };
}

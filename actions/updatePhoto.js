export const UPDATE_PHOTO = "student:updatePhoto";
import * as SQLite from "expo-sqlite";
import Axios from "axios";
import { postBaseUrl } from "../components/requests";

const db = SQLite.openDatabase("db.db");

export const updateAvatar =  (user_id,payload) => {

  return dispatch =>{  
    // console.log("gdxgx",payload._id)
Axios.put(`${postBaseUrl}/user/${user_id}/`, payload)
.then(function (response) {
//  console.log('post',response.data);
if (response.status == 200 ) {
      console.log(response.data)
      dispatch(updatePhoto(response.data))
      db.exec(
        [
          {
            sql:
              "insert into user (avatar) values (?,?,?,?);",
            args: [response.data[0].avatar]
          }
        ],
        false,
        (tx, results) => {
          // console.log("k", results);
          // console.log("Results", results[0].rowsAffected);
          if (results[0].rowsAffected > 0) {
             this.setState({message:"success",isLoading:false});
             this.login(username,password,role);
          }
        }
      );  
    }
    
     
  })
.catch(function (error) {
console.log(error);
});


}
}

export default function updatePhoto(uri) {
  

        
      
  // console.log('upPhoto', a)
  return {
    type: UPDATE_PHOTO,
    payload: uri
  };
}
export const Login = "user:updateLogin";
import * as SQLite from "expo-sqlite";
import { get, postBaseUrl } from "../components/requests";
import axios from 'axios'

export const add =  (payload) => {
payload['avatar'] = null
  return dispatch =>{  
axios.post(`${postBaseUrl}/user/`, payload)
.then(function (response) {
console.log('post',response.data);
if (response.status == 201 ) {
  dispatch(updateLogin(response.data))
}

})
.catch(function (error) {
console.log(error);
});


}
}



export default function updateLogin(data) {

    console.log('login', data)
    return {
    type: Login,
    payload: data
  }
  
}
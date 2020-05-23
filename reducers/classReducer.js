import { UPDATE_CLASS } from "../actions/classAction";
import Axios from "axios";

const get = async (url) =>{
  var a = []
  await Axios.get(url,{timeout: 2000,
    headers: {'Content-Type': 'application/json'}})
    .then(function (response) {
      a = response.data
      if (response.status == 200 ) {
        
        
       a.push(response.data)
      }
       
    })
    .catch(function (error) {
      console.log(error)
      return error.status
    })
    .then(function () {
      // always executed
    });
    return a
}
export default function classReducer(state = [], { type, payload }) {
  switch (type) {
    case UPDATE_CLASS:
      url = 'http://school.mstudio.com.ng/api/classes'+payload
      state.push(get());
      return state

    default:
      return state;
  }
}

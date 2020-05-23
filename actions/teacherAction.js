import Axios from "axios";
export const UPDATE_Teacher = "student:updateTeacher";



export function updateTeacher(id) {
  return {
    type: UPDATE_Teacher,
    payload: id
  };
}
// ${data}
export const apiRequest = (data) => {
  var url = `http://school.mstudio.com.ng/api/teacher/3`
  return dispatch => {
      Axios.get(url,{timeout: 1000,
        headers: {'Content-Type': 'application/json'}})
        .then(function (response) {
          
          if (response.status == 200 ) {
            
            // console.log(response.data)
          dispatch(updateTeacher(response.data)) 
          }
           
        })
        .catch(function (error) {
          console.log(error)
          return error.status
        })
        .then(function () {
          // always executed
        });
      }
}
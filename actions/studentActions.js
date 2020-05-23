export const UPDATE_STUDENT = "student:updateStudent";
import Axios from "axios";


// 

export default function updateStudent(student) {
  // console.log('students',student)
  return {
    type: UPDATE_STUDENT,
    payload: student
  };
}

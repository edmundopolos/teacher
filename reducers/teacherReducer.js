import { UPDATE_Teacher } from "../actions/teacherAction";


export default function teacherReducer(state = [], { type, payload }) {
    
  switch (type) {
    case UPDATE_Teacher:
     
    // console.log(payload)
    return payload
    default:
      return state;
  }
}
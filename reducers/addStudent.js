import { ADD } from "../actions/addStudent";

export default function student(state = [], { type, payload }) {
  switch (type) {
    case ADD:
      // function fn(item, index) {
      //   state.push(item);
      // }
      // payload.forEach(fn);
      // console.log("test" + state);
      return payload;

    default:
      return state;
  }
}

import { Select_Student } from "../actions/selectedStudent";

export default function selectStudent(state = {}, { type, payload }) {
  switch (type) {
    case Select_Student:
      // console.log(payload);
      return payload;

    default:
      return state;
  }
}

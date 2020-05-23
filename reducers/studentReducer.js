import { UPDATE_STUDENT } from "../actions/studentActions";


export default function studentReducer(state = [], { type, payload }) {
  switch (type) {
    case UPDATE_STUDENT:
      return payload;

    default:
      return state;
  }
}

import { UPDATE_GROUP } from "../actions/groupActions";

export default function selectGroup(state = {}, { type, payload }) {
  switch (type) {
    case UPDATE_GROUP:
      console.log(payload);
      return payload;

    default:
      return state;
  }
}

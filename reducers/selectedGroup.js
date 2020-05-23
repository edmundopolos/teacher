import { UPDATE_GROUP } from "../actions/selectedGroup";

export default function selectGroup(state = {}, { type, payload }) {
  switch (type) {
    case UPDATE_GROUP:
      // console.log('group data',payload);
      return payload;

    default:
      return state;
  }
}

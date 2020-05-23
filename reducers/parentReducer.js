import { Parent } from "../actions/parent";

export default function selectParent(state = {}, { type, payload }) {
  switch (type) {
    case Parent:
      console.log('parent',payload);
      return payload;

    default:
      return state;
  }
}

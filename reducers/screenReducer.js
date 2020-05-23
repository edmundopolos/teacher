import { UPDATE_SCREEN } from "../actions/screenAction";

export default function screenReducer(state = {}, { type, payload }) {
  switch (type) {
    case UPDATE_SCREEN:
      return payload;

    default:
      return state;
  }
}

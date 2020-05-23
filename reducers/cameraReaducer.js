import { CAMERA_POST } from "../actions/cameraPost";

export default function cameraReducer(state = {}, { type, payload }) {
  switch (type) {
    case CAMERA_POST:
      return payload;

    default:
      return state;
  }
}

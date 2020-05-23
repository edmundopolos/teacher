import { UPDATE_POST } from "../actions/postActions";
import { LIKE_POST } from "../actions/likePost";
import * as SQLite from "expo-sqlite";
import { postBaseUrl } from "../components/requests";





export default function postReducer(state = [], { type, payload }) {
  switch (type) {
    case UPDATE_POST:

      state = payload;
  // console.log('reducer',state)
      return payload;

      case LIKE_POST:
        console.log('like',payload)
        state[payload]['like'] = true
        return state

    default:

      return state;
  }
}

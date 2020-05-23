import { MESSAGES } from "../actions/messageActions";


export default function messageReducer(state = [], { type, payload }) {
 
  switch (type) {
    case MESSAGES:

   console.log('messages',payload)

      return payload;

    default:

      return state;
  }
}

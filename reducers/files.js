import { Create_File } from "../actions/createFile";

export default function allFile(state = [], { type, payload }) {
  switch (type) {
    case Create_File:
    console.log('file',payload)
      return payload;

    default:
      return state;
  }
}

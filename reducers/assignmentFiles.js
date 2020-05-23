import { Add_Files } from "../actions/addFile";
import { Splice_Files } from "../actions/aSliceFile";

export default function allFiles(state = [], { type, payload }) {
  switch (type) {
    case Add_Files:
      payload["id"] = Math.floor(Math.random() * 100);
      console.log("reduce", payload);
      state.push(payload);
      return state;

    case Splice_Files:
      state = payload;
      console.log("sata", payload);
      return state;

    default:
      console.log(state);
      return state;
  }
}

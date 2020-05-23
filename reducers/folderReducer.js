import { Create_Folder } from "../actions/createFolder";

export default function allFolder(state = [], { type, payload }) {
  switch (type) {
    case Create_Folder:
   
      // console.log('folders', payload)
      
      return payload;

    default:
      return state;
  }
}

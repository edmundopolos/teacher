export const Add_Files = "files:createFile";

export default function addFile(item) {
  // console.log("obj", item);
  return {
    type: Add_Files,
    payload: item
  };
}

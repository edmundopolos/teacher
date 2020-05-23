export const Splice_Files = "files:REMOVEFile";

export default function aspliceFile(item) {
  console.log("obj", item);
  return {
    type: Splice_Files,
    payload: item
  };
}

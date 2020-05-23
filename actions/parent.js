export const Parent = "parent:updateParent";

export default function updateParent(payload) {
  return {
    type: Parent,
    payload: payload
  };
}

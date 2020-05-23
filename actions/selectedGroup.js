export const UPDATE_GROUP = "group:updategroup";

export default function updateGroup(screen) {
  return {
    type: UPDATE_GROUP,
    payload: screen
  };
}

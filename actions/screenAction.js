export const UPDATE_SCREEN = "screen:updatescreen";

export default function updateScreen(screen) {
  return {
    type: UPDATE_SCREEN,
    payload: screen
  };
}

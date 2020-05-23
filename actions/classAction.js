export const UPDATE_CLASS = "student:updateclass";

export default function updateClass(student) {
  return {
    type: UPDATE_CLASS,
    payload: student
  };
}

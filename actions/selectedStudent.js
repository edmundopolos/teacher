export const Select_Student = "student:selectstudent";

export default function selectStudent(screen) {
  return {
    type: Select_Student,
    payload: screen
  };
}

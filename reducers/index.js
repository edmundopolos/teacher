import { combineReducers } from "redux";

import postReducer from "./post";
import groupReducer from "./group";
import screenReducer from "./screenReducer";
import studentReducer from "./studentReducer";
import selectGroup from "./selectedGroup";
import allFolder from "./folderReducer";
import allFile from "./files";
import student from "./addStudent";
import classReducer from "./classReducer";
import selectParent from "./parentReducer";
import selectStudent from "./selectedStudent";
import allFiles from "./assignmentFiles";
import getAssigment from "./getAssigment";
import userReducer from "./userReducer";
import cameraReducer from "./cameraReaducer";
import teacherReducer from "./teacherReducer";
import messageReducer from "./messageReducer";
import getQuiz from "./getQuiz";

export default combineReducers({
  Groups: groupReducer,
  Posts: postReducer,
  Screen: screenReducer,
  Student: studentReducer,
  CurrentGroup: selectGroup,
  Folders: allFolder,
  Files: allFile,
  Members: student,
  Classes: classReducer,
  Parent: selectParent,
  Selected: selectStudent,
  Afiles: allFiles,
  Assignments: getAssigment,
  User: userReducer,
  Camera: cameraReducer,
  Teacher: teacherReducer,
  Messages: messageReducer,
  Quiz: getQuiz

});

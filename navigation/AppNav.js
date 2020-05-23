import React from "react";
import Login from "../screens/login";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  Platform
} from "react-navigation";
import AppNavigator from "../TeacherNavigation/AppNavigator";
import ParentNavigator from "../parent/ParentNavigation/ParentNavigator";
import StudentNavigation from "../student/StudentNavigation/StudentNavigator";
import Welcome from "../screens/welcome";
import login from "../screens/login";

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Welcome: Welcome,
    Login: login,
    Parent: ParentNavigator,
    Teacher: AppNavigator,
    Student: StudentNavigation
  })
);

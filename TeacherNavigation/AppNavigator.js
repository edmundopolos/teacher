import React from "react";

import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  Platform
} from "react-navigation";
import AuthNavigation from "./AuthNavigation";
import MainTabNavigator from "./MainTabNavigator";

import Group from "../teacher/class/group";
import allGroups from "../teacher/allGroups";
import Login from "../screens/login";

// const StackGroup = createStackNavigator({
//   Group: allGroups,
//   SubGroup: groupScreen,
//   Select: selectMember,
//   Add: CreateGroup
// });

// const MaterialStack = createStackNavigator({
//   Folders: Folders,
//   AddFolder: AddFolder,
//   Files: files
// });

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    // Auth: Login,
    Main: MainTabNavigator

    // Material: MaterialStack,

    // Group: GroupStack
  })
);

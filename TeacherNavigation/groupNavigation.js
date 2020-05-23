import React from "react";
import { View } from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import selectMember from "../teacher/selectMember";
import CreateGroup from "../teacher/forms/CreateGroup";
import Group from "../teacher/class/group";

const GroupStack = createStackNavigator({});

// const SwitchNavigation = createSwitchNavigator({
//   Group: GroupStack
// }); createAppContainer();

export default GroupStack;

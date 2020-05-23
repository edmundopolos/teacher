import React from "react";
import {
  Platform,
  View,
  Text,
  Dimensions,
  StatusBar,
  ActivityIndicator
} from "react-native";
import {
  createSwitchNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";

// import Group from "../screens/class/group";
import Post from "../teacher/class/post";
import groupPost from "../teacher/class/groupPost";
import member from "../teacher/member";
import selectMember from "../teacher/selectMember";
import material from "../screens/material";
import AddFolder from "../teacher/forms/createfolder";
import createGroupPost from "../components/createGroupPost";
import camera from "../components/camera";
import files from "../teacher/files";
import createPost from "../components/createPost";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const posts = createStackNavigator({
  Post: groupPost,
  AddPost: createPost
});

const Materials = createStackNavigator({
  Material: material,
  Files: files,
  Camera: camera
});

const Stack = createStackNavigator({
  Member: member,
  Select: selectMember
});

const TabNavigator = createMaterialTopTabNavigator(
  {
    Post: posts,

    Material: Materials,
    Students: Stack
  },
  {
    tabBarOptions: {
      labelStyle: {
        fontSize: 10
      },

      style: {
        backgroundColor: "#26234e"
      }
    }
  }
);

const SwitchNavigator = createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  TopBar: TabNavigator
});
export default createAppContainer(SwitchNavigator);

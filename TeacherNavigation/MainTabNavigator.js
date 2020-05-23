import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import Group from "../teacher/class/group";
// import Login from "../screens/login";
import TabBarIcon from "../components/TabBarIcon";
import Classes from "../teacher/Classes";

import CreatePosts from "../components/createPost";
import CreateComment from "../components/comment";
import allGroups from "../teacher/allGroups";
import Feed from "../teacher/post";
import Chat from "../screens/chat";
import Parents from "../teacher/chatlist";
import Post from "../teacher/class/post";
import AddPost from "../teacher/forms/createPost";
import selectMember from "../teacher/selectMember";
import CreateGroup from "../teacher/forms/CreateGroup";
import groupScreen from "../teacher/groupScreen";
import Folders from "../teacher/material";
import AddFolder from "../teacher/forms/createfolder";

import files from "../teacher/files";
import Assignment from "../teacher/forms/assignment";
import assignmentFolder from "../teacher/assignmentFolder";
import AssignmentFiles from "../teacher/assignmentFiles";
import SettingsScreen from "../screens/SettingsScreen";
import Cam from "../components/camera";
import CreatePost from "../teacher/forms/createPost";
import allStudents from "../teacher/allStudents";
import Quiz from "../teacher/forms/quiz";
import FullImage from "../components/fullImage";
import CommentScreen from "../screens/commentScreen";
import viewAssignments from "../teacher/viewAssignments";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const AssignmentFolder = createStackNavigator({
  Create: Assignment,
  Folders: assignmentFolder,
  AllFiles: AssignmentFiles
});

const ClassStack = createStackNavigator(
  {
    Classes: Classes,
    Class: Post,
    AddPost: CreatePosts,
    Group: allGroups,
    SubGroup: groupScreen,
    Select: selectMember,
    Add: CreateGroup,
    Material: Folders,
    AddFolder: AddFolder,
    Files: files,
    Assignment: viewAssignments,
    Camera: Cam,
    Member:allStudents,
    Quiz: Quiz,
    Full:FullImage,
    Comment: CreateComment,
    CommentScreen: CommentScreen
  },
  config
);

ClassStack.navigationOptions = {
  tabBarLabel: "Class",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-school${focused ? "" : "-outline"}`
          : "md-school"
      }
    />
  )
};

ClassStack.path = "";

const ListStack = createStackNavigator(
  {
    List: Parents,
    Chat: Chat
  },
  config
);

ListStack.navigationOptions = {
  tabBarLabel: "Chat",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-chatbubbles" : "md-chatbubbles"}
    />
  )
};

ListStack.path = "";



const SettingStack = createStackNavigator(
  {
    Setting: SettingsScreen,
    Full:FullImage,
  },
  config
);

SettingStack.navigationOptions = {
  tabBarLabel: "Setting",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-settings${focused ? "" : "-outline"}`
          : "md-settings"
      }
    />
  )
};

const FeedStack = createStackNavigator(
  {
    Feed: Feed,
    NewPost: CreatePosts,
    Camera: Cam,
    Full: FullImage,
    Comment: CreateComment,
    CommentScreen: CommentScreen
  },
  config
);

FeedStack.navigationOptions = {
  tabBarLabel: "Feed",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-wifi${focused ? "" : "-outline"}`
          : "md-wifi"
      }
    />
  )
};

// Login.path = "";

const tabNavigator = createBottomTabNavigator({
  ClassStack,
  ListStack,
  FeedStack,
  SettingStack
});

tabNavigator.path = "";

export default tabNavigator;

import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Post from "../teacher/class/post";
const { width } = Dimensions.get("window");
const DefaultStack = createStackNavigator({
  Post: Post
});

export default DefaultStack;

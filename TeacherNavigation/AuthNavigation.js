import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import Login from "../screens/login";
// import LinksScreen from '../screens/LinksScreen';
// import SettingsScreen from '../screens/SettingsScreen';

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const LoginStack = createStackNavigator(
  {
    Login: Login
  },
  config
);

LoginStack.navigationOptions = {
  tabBarLabel: "Login",
  headerMode: "none",
  headerShown: false,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

Login.path = "";

// const WelcomeStack = createStackNavigator(
//   {
//     Welcome: WelcomeScreen
//   },
//   config
// );

// WelcomeStack.navigationOptions = {
//   tabBarLabel: "Welcome",
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === "ios" ? "ios-link" : "md-link"}
//     />
//   )
// };

// WelcomeStack.path = "";

const authNavigator = createStackNavigator({
  Login: LoginStack
});

export default authNavigator;

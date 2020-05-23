import { createBrowserApp } from "@react-navigation/web";
import {
  createStackNavigator,
  createSwitchNavigator,
  Platform
} from "react-navigation";
import Login from "../screens/login";
import MainTabNavigator from "./MainTabNavigator";
import DefaultClass from "../screens/defaultClass";
import { Ionicons } from "@expo/vector-icons";
import Topnav from "../screens/test";

const LoginStack = createStackNavigator({
  Login: Login
});

const ClassStack = createStackNavigator({
  Single: DefaultClass
});

const switchNavigator = createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  // Auth: Login,
  Test: Topnav,
  Main: MainTabNavigator,
  Class: ClassStack
});
switchNavigator.path = "";

export default createBrowserApp(switchNavigator, { history: "hash" });

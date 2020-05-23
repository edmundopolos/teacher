import { createBrowserApp } from "@react-navigation/web";
import {
  createStackNavigator,
  createSwitchNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";
import { Platform } from "react-native";

import Group from "../screens/class/group";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const tabNavigator = createMaterialTopTabNavigator(
  {
    Post: Group,
    Material: Group,
    Assignment: Group,
    Group: Group
  },
  {
    tabBarOptions: {
      labelStyle: {
        fontSize: 12
      },
      tabStyle: {},
      style: {
        backgroundColor: "blue"
      }
    }
  }
);

tabNavigator.path = "";

const SwitchNavigator = createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Material: tabNavigator
});

export default createBrowserApp(SwitchNavigator, { history: "hash" });

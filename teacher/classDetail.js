import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StatusBar
} from "react-native";

export default class Details extends React.Component {
  componentWillMount() {
    this.startHeaderHeight = 80;
    if (Platform.OS == "android") {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
    }
  }

  render() {
    return <View></View>;
  }
}

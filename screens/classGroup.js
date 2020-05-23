import React, { Component } from "react";
import {
  View,
  Platform,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import BlockIcon from "../components/blockIcon";
import Header from "../components/header";
import { Ionicons } from "@expo/vector-icons";
// import GroupModal from "../components/groupModal";

export default class MainGroup extends Component {
  state = {
    title: ""
  };

  render() {
    // const name = this.props.navigation.getParam("name");
    return <View></View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  }
});

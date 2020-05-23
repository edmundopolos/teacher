import React, { Component } from "react";
import {
  View,
  Platform,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import BlockIcon from "../../components/blockIcon";
import Header from "../../components/header";
import { Ionicons } from "@expo/vector-icons";
import GroupModal from "../../components/groupModal";
import GroupScreen from "../groupScreen";
import TopBar from "../../TeacherNavigation/TopBar";
import MainGroup from "../../screens/classGroup";
export default class Group extends Component {
  state = {
    title: this.props.navigation.getParam("name")
  };

  render() {
    const { navigate } = this.props.navigation;
    const { goBack } = this.props.navigation;
    // const name = this.props.navigation.getParam("name");
    return (
      <View>
        {/* <Header name={name} navigation={navigate} /> */}
        <GroupScreen />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  }
});

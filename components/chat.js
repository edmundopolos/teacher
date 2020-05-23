import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function Teacher(props) {
  return (
    <TouchableOpacity style={styles.container} key={props.id} {...props} >
      <View style={styles.avatar} key={props.id}>
        <Ionicons
          size={40}
          name={Platform.OS === "ios" ? "ios-contact" : "md-contact"}
          color={"gray"}
        />
      </View>
      <View style={styles.name}>
        <Text style={styles.textName}>{props.name}</Text>
        <Text style={styles.textClass}>{props.class}</Text>
      </View>
      <View style={styles.class}></View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    // elevation: 5,
    // marginTop: 10,
    flexDirection: "row",
    // backgroundColor: "rgb(0, 200, 81)",
    alignItems: "center",

    width: width - 30,
    height: 100,

  },
  avatar: { padding: 20 },
  name: {
    width: 200,

    padding: 10
  },
  class: {
    width: 100,
    padding: 10,
    marginLeft: 50
  },
  textName: {
    fontSize: 20
  },
  textClass: {
    fontSize: 13,
    color: "#565050"
  }
});

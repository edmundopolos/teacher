import React, { Component } from "react";
import {
  View,
  Platform,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import MultiSelect from "react-native-multiple-select";
import { Ionicons } from "@expo/vector-icons";

export default function BlockIcon(props) {
  return (
    <View>
      <View>
        <TouchableOpacity
          hitSlop={{
            top: 10,
            bottom: 10
          }}
          {...props}
        >
          <View style={styles.options}>
            <Ionicons
              size={35}
              name={
                Platform.OS === "ios" ? "ios-" + props.name : "md-" + props.name
              }
              color={"#26234e"}
            />
            <Text  style={{
                  fontFamily: "Lato"}}>{props.title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    justifyContent: "space-around",
    alignItems: "center"
  },
  icon: { color: "#0f2331" },
  options: {
    justifyContent: "space-around",
    alignItems: "center"
  }
});

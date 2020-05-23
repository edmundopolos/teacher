import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Dimensions,
  KeyboardAvoidingView
} from "react-native";
const { width } = Dimensions.get("window");
const TextIn = props => {
  return (
    <KeyboardAvoidingView keyboardVerticalOffset={30} style={styles.inputWrap}>
      <Ionicons
        name={
          Platform.OS === "ios" ? "ios-" + props.ios : "md-" + props.android
        }
        size={26}
        style={styles.inputIcon}
        color={"#000"}
      />
      <TextInput {...props} style={styles.input} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 45,
    borderBottomWidth: 1,

    // backgroundColor: "white",
    width: width - 55,
    height: 35,
    paddingLeft: 65,
    paddingRight: 20,
    fontSize: 10,
    fontFamily: "Lato"
  },
  inputIcon: {
    position: "absolute",
    // top: 5,
    left: 15,
    color: "#26234e"
  },
  inputWrap: {
    // marginTop: 5
  }
});

export default TextIn;

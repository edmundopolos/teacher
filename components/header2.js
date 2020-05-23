import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MenuModal from "./classMenu";

const { width } = Dimensions.get("window");
const ClassHeader = props => {
  // const { navigate } = props.navigation;
  const [menu, setMenu] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.text2}>{props.name}</Text>
      <Text style={styles.text}>
        {props.screen ? props.screen : props.ward}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: 100,
    padding: 30,
    borderBottomWidth: 0.5,
    borderColor: "#33333394",
    shadowOpacity: 0.7,
    shadowRadius: 10,
    // flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
    // elevation: 1
  },
  icon: {
    marginLeft: 10,
    paddingRight: 20
  },
  text: {
    fontFamily:"Lato",
    fontSize: 10,
    fontWeight: "300",

    color: "#000"
  },
  menu: {
    position: "absolute",
    top: 35,
    right: -40
  },
  text2: {
    fontFamily:"Lato",
    fontSize: 20,
    fontWeight: "300",

    color: "#000"
  }
});

export default ClassHeader;

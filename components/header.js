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
const Header = props => {
  // const { navigate } = props.navigation;
  const [menu, setMenu] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {props.screen ? props.screen : props.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    // height: 50,
    padding: 10,
    // borderBottomWidth: 0.5,
    borderColor: "#33333394",
    backgroundColor:"#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    elevation: 1
  },
  icon: {
    marginLeft: 10,
    paddingRight: 20
  },
  text: {
    fontSize: 20,
    fontWeight: "300",
    fontFamily:"Lato",
    color: "#000"
  },
  menu: {
    position: "absolute",
    top: 35,
    right: -40
  }
});

export default Header;

import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
  Dimensions
} from "react-native";
import * as Font from 'expo-font'

const {width} = Dimensions.get("window")
export default function Infobar(props) {


  const color = props.color;
  return (
    <TouchableOpacity
      {...props}
      hitSlop={{
        top: 30,
        bottom: 30
      }}
      style={styles.container}
    >
      <View style={{ flexDirection: "row" }}>
        <Ionicons
          size={26}
          name={Platform.OS === "ios" ? props.name : props.name}
          color={props.color}
        />
        <View><Text style={styles.text}>{props.title}</Text></View>
        </View>
        {props.sub ?<View ><Text style={styles.subText}>{props.sub}</Text></View>: null}
      
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor:"#fff",
    justifyContent:"space-around",
    borderRadius: 15,
    elevation: 1,
    width: width-20
  },

  text: {
    fontFamily:"Lato",
    fontSize: 15,
    fontWeight: "400",
    paddingLeft: 20,
    color: "#000"
  },
  subText: {
    justifyContent:"flex-end",
    fontFamily:"Lato",
    fontSize: 15,
    fontWeight: "400",
    paddingLeft: 35,
    color: "#000"
  },
  icon: {
    color: "green",
    position: "absolute",
    top: 8,
    paddingRight: 15
  }
});

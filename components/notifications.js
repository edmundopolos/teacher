import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function NoteTab(props) {
  return (
    <TouchableOpacity
      style={styles.container}
      {...props}
    >
      <View style={styles.innerContainer}>
        <View style={styles.infotitle}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
        <View style={styles.infonumber}>
          <Text>{props.number}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 100,
    borderRadius: 15,
    backgroundColor: "#26234e",
    marginBottom: 10,
    elevation: 10,
    marginTop: 10
  },
  innerContainer: {
    marginTop: 28,
    width: 200,
    height: 70,
    borderRadius: 15,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around"
  },
  infotitle: {
    padding: 15
  },
  infonumber: {
    padding: 15
  },
  title: {
    fontFamily:"Lato",
    fontSize: 20,
    color: "#26234e"
  },
  number: {
    fontFamily:"Lato",
    fontSize: 10
  }
});
// #032661

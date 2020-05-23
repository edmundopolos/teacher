import React, { Compnent } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";

const { width, height } = Dimensions.get("window");
export default function WardTab(props) {
  return (
    <TouchableOpacity {...props} style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.demograph}>
          <View style={styles.name}>
            <Text style={styles.text1}>{props.name}</Text>
          </View>
          
        </View>
        <View>
          <View style={styles.section}>
            <Text style={styles.text1}>{props.class}</Text>
          </View>
         <View style={styles.department}>
              <Text style={styles.text2}>{props.section}</Text>
         </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    elevation: 5,
    backgroundColor: "#26234e",
    alignItems: "center",
    borderRadius: 20,
    width: width - 30,
    height: 100,
    margin: 10
  },
  innerContainer: {
    width: width-50,
    backgroundColor: "#fff",
    height: 100,
    borderRadius: 20,
    marginLeft: 30,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  name: {
    padding: 15
  },
  section: {
    padding: 15
  },
  age: {
    padding: 15
  },
  department: {
    padding: 15
  },
  text1: {
    fontFamily:"Lato",
    fontSize: 18,
    color: "#26234e"
  },
  text2: {
    fontFamily:"Lato",
    fontSize: 15,
    color: "#a3a3a3"
  }
});

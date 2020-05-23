import { Ionicons } from "@expo/vector-icons";
import React, {useState} from "react";
import {
  View,
  Text,
  Picker,
  StyleSheet,
  Platform,
  Dimensions
} from "react-native";
const { width } = Dimensions.get("window");
type props = {
    selected?: String,
   
  };
const Dropdown = props => {
  const data = props.options.map((options, idx) => <Picker.Item key={idx} label={options.name} value={options} />);
  const [selected,setSelected] = useState("")    
  return (
    <View style={styles.inputWrap}>
    

      <Picker
        selectedValue={selected}
        onValueChange={(itemValue, itemIndex) => {props.selected(itemValue); setSelected(itemValue)}}
        style={styles.input}
      >
        {data}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 45,
    backgroundColor: "#d3d3d3",
    width: width - 55,
    height: 35,
    paddingLeft: 45
  },
  inputIcon: {
    position: "absolute",
    top: 5,
    left: 15
  },
  inputWrap: {
    marginTop: 5
  }
});

export default Dropdown;

import React, { Component } from "react";
import {
  Button,
  View,
  StyleSheet,
  DatePickerAndroid,
  TimePickerAndroid,
  StatusBar
} from "react-native";

export default class Date extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button title="hi" onPress={this.openDatePicker}>
          hi
        </Button>
      </View>
    );
  }
  async openDatePicker() {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        // date: new Date(2020, 4, 25),
        day: "20",
        month: "4",
        year: "2029"
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        alert(year, month, day);
        // Selected year, month (0-11), day
        console.log(year);
        console.log(month);
        console.log(day);
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  }
  async openTimePicker() {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: 14,
        minute: 15,
        is24Hour: true, // Will display '2 PM'
        interval: 15
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        // Selected hour (0-23), minute (0-59)// Selected year, month (0-11), day
        console.log(hour);
        console.log(minute);
        alert(hour, minute);
      }
    } catch ({ code, message }) {
      console.warn("Cannot open time picker", message);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: StatusBar.height,
    backgroundColor: "#ecf0f1"
  }
});

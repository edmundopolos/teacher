import React, { Component } from "react";
import TextIn from "../../components/textInputs/textInput";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar
} from "react-native";
import Dropdown from "../../components/textInputs/picker";
import { SafeAreaView } from "react-navigation";
import { connect } from "react-redux";
import updateGroup, { add } from "../../actions/groupActions";

class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      purpose: "",
      type: "",
      max: "",
      classId: this.props.screenName.Id,
      created: new Date(),
      class: this.props.screenName.ClassName
    };
    this.press = this.press.bind(this);
  }

  press() {

    this.props.onSubmit(this.state);
    this.props.navigation.navigate("Group");
  }
  selected(){
    return
  }
  render() {
    // console.log('screen group',this.props.screenName)
    const options = [
      { id: 0, name: "" },
      { id: 1, name: "private" },
      { id: 2, name: "public" }
    ];

    return (
      <ScrollView>
        <StatusBar
          hidden={false}
          backgroundColor="white"
          // translucent={true}
          barStyle="light-content"
        />
        <View style={styles.container}>
          <Text style={{color:"#26234e"}}> Create New Group</Text>
          <View style={{margin:10}}>
            <TextIn
              ios={"people"}
              android={"people"}
              placeholder={"name"}
              placeholderTextColor="black"
              onChangeText={text => this.setState({ name: text })}
            />
            </View>
            <View style={{margin:10}}>
            <TextIn
              ios={"list"}
              android={"list"}
              placeholder="Purpose"
              placeholderTextColor="black"
              onChangeText={text => this.setState({ purpose: text })}
            />
            </View>
            <View style={{margin:10}}>
            <Dropdown
              selectedValue={this.state.type}
              selected={this.selected}
              ios={"arrow-down"}
              android={"arrow-down"}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ type: itemValue })
              }
              options={options}
            />
            </View>
            <View style={{margin:10}}>
            <TextIn
              ios={"add"}
              android={"add"}
              placeholder="Max Number"
              placeholderTextColor="black"
              onChangeText={text => this.setState({ max: text })}
              keyboardType={"numeric"}
            />
            <TouchableOpacity
              onPress={this.press}
              hitSlop={{
                top: 10,
                bottom: 10,
                left: 10,
                right: 10
              }}
              style={styles.button}
            >
              <Text style={{color:"#26234e"}}>submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  },
  button: {
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20
  }
});
const mapPropToState = state => ({
  posts: state.Posts,
  screenName: state.Screen
});

const mapActionToState = {
  onSubmit: add
};

export default connect(mapPropToState, mapActionToState)(CreateGroup);

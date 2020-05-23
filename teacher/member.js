import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  Dimensions,
  ScrollView,
  RefreshControl,
  StatusBar
} from "react-native";
import { connect } from "react-redux";
import Infobar2 from "../components/infoBar2";
import Header from "../components/header";
import { Ionicons } from "@expo/vector-icons";

import createFile from "../actions/createFile";
import { get, del } from "../actions/addStudent";

const { width, height } = Dimensions.get("window");
class Student extends React.Component {
  state = {
    members: this.props.members,
    refresh: "",
    refreshing: false
  };
  timer;

  wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }
  onRefresh = () => {
    this.setRefreshing();

    this.wait(2000).then(() => this.setRefreshing());
  };

  
  delete = (id)=>{
    // console.log('del',id)
    this.props.delete(id)
    this.setRefreshing()
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setRefreshing()
      }, 1000);
    // this.props.get()
  }

  timer;



  componentWillUnmount() {
    clearInterval(timer);
  }

  setRefreshing() {
    const inState = this.state.members 
    if (this.props.members != inState){
      this.setState({
        members: this.props.members
      })
    }
  }


  static navigationOptions = { header: null };
  render() {
    const arr = this.state.members;
    // console.log(arr);
    var screen = this.props.screen;
    console.log('screen member', screen)

    const members = this.props.members.map(item =>
      item.groupId == screen._id ? (
        <View key={item._id} style={styles.classes}>
          <Infobar2
            title={item.name}
            name={"people"}
            id={item.id}
            del={this.delete}
            color={"green"}
            onPress={() => {
              this.props.navigation.navigate("members", {
                folder: item.name
              });
            }}
          />
        </View>
      ) : (
        null
      )
    );

    const name = this.props.navigation.getParam("folder");
    return (
      <View style={styles.container}>
        <StatusBar
          hidden={false}
          backgroundColor="white"
          // translucent={true}
          barStyle="light-content"
        />
        <View></View>
        <ScrollView
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          {members}
        </ScrollView>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Select")}
          style={styles.add}
        >
          <Ionicons
            name={Platform.OS === "ios" ? "ios-add" : "md-add"}
            size={20}
            color={"white"}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    height: height
  },
  content: {
    marginTop: 10
  },
  classes: { padding: 10, width: width - 20, height: 100, fontFamily:"Roboto" },
  add: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 50,
    height: 50,
    borderRadius: 100,
    borderColor: "#0f2331",
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 0.5,
    backgroundColor: "#26234e"
  }
});

const mapPropToState = state => ({
  members: state.Members,
  screen: state.CurrentGroup
});

const mapActionToProp = {
  get: get,
  delete: del
};

export default connect(mapPropToState, mapActionToProp)(Student);

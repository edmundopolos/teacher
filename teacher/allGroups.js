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
import updateGroup from "../actions/selectedGroup";
import * as SQLite from "expo-sqlite";
import updateScreen from "../actions/screenAction";
import { del } from "../actions/groupActions";
import { get as getMembers } from "../actions/addStudent";

const db = SQLite.openDatabase("db.db");
const { width, height } = Dimensions.get("window");
class AllGroups extends React.Component {
  state = {
    groups: this.props.groups,
    refresh: ""
  };
  constructor(props) {
    super(props);
    this.timer;
    this.set;
  }

  set;

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    // if (this.props.groups != this.state.groups) {
     
    //   this.setState({ groups: this.props.groups });
    // }
  }


  feedback(response){
    console.log(response)
  if (response) {
     
 this.setRefreshing()
       
    }else{
      ShowAlert('Groups','unable to perfom action')
    }
    
  }

  wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }
  onRefresh = () => {
    this.setRefreshing();

    this.set = this.wait(10000).then(() => this.setRefreshing());
  };

  componentDidMount() {
    try {
    this.timer = setInterval(() => {
      this.setRefreshing()
    }, 1000);      
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.setState({refresh: true});
      }
    );
    } catch (error) {
      console.log(error)
    }
    const inState = this.state.groups
    if (this.props.groups != inState){
      this.setState({
        groups: this.props.groups
      })
    }
    this.props.getMembers()

  }

  componentWillUnmount() {
    try {
          clearInterval(this.timer);
    clearInterval(this.set);
    this.willFocusSubscription.remove()
    } catch (error) {
      console.log(error)
    }

  }


  setRefreshing() {
    const inState = this.state.groups
    if (this.props.groups != inState){
      this.setState({
        groups: this.props.groups
      })
    }
  }

  groupName(name) {
    this.props.updateGroup(name);
  }

  static navigationOptions = ({ navigation }) => {
    // console.log(navigation);
    return {
  
      title: "Groups"
    };
  };

  delete = (id,feedback)=>{
    // console.log('del',id)
    this.props.delete(id,this.feedback)
    this.onRefresh()
  }

  render() {
    const screen = this.props.screen;
    const all = this.props.groups.filter(function(obj) {
      // console.log("con " + this.state.groups);

      return obj.class == screen;
    });
    // console.log("con " + JSON.stringify(this.state.groups));
    // console.log('sree',this.props.screen);
    const groups = this.state.groups.map(list =>
      list.classId == screen.Id ? (
        <View key={list._id} style={styles.classes}>
          <Infobar2
            title={list.name}
            name={"people"}
            id={list.id}
            color={"#26234e"}
            del={this.delete}
            onPress={() => {
              this.groupName(list);

              this.props.navigation.navigate("SubGroup", {
                name: list
              });
            }}
          />
        </View>
      ) : (
        null
      )
    
    );
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
          // refreshControl={
          //   <RefreshControl
          //     refreshing={this.state.refreshing}
          //     onRefresh={this.onRefresh}
          //   />
          // }
        >
          {groups}
        </ScrollView>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Add")}
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
  groups: state.Groups,
  screen: state.Screen
});

const mapActionToProp = {
  updateGroup: updateGroup,
  updateScreen: updateScreen,
  getMembers: getMembers,
  delete: del
};

export default connect(mapPropToState, mapActionToProp)(AllGroups);

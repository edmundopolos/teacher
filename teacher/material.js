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
import BlockIcon from "../components/blockIcon";
import updateGroup from "../actions/selectedGroup";
import { get,del } from "../actions/createFolder";
// import { get as allFiles } from "../actions/createFile";

const { width, height } = Dimensions.get("window");
class Folders extends React.Component {
  state = {
    folders: this.props.folders,
    refresh: "",
    refreshing: false
  };
  timer;


  componentDidMount() {
    try {
       this.timer = setInterval(() => {
    this.setRefreshing()
    }, 1000);

    this.props.getFolders()
    // this.setState({ refresh: true });  
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.setState({refresh: true});
      }
    );
    } catch (error) {
      console.log(error)
    }

 
  }

  componentWillUnmount() {
    try {
      clearInterval(this.timer);
    this.willFocusSubscription.remove()
    } catch (error) {
      console.log(error)
    }

  }

  setRefreshing() {
    const inState = this.state.folders
    if (this.props.folders != inState){
      this.setState({
        folders: this.props.folders
      })
    }
  }

  delete = (id)=>{
    // console.log('del',id)
    this.props.delete(id)
    this.setState({refresh: true})
  }

  onRefresh = () => {
    this.setRefreshing();

    this.wait(2000).then(() => this.setRefreshing());
  };
  wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  static navigationOptions = ({ navigation }) => {
    // console.log(navigation);
    return {
      
      title: "Materials"
    };
  };
  render() {
    const screen = this.props.screen;
    const all = this.state.folders.filter(function(obj) {
      return obj.class == screen;
    });
// console.log('folder' , screen)
    const folders = this.state.folders.map(list =>
      list.class == screen.Id && list.groups == "" ? (
        <View key={list._id} style={styles.classes}>
          <Infobar2
            title={list.name}
            name={"folder"}
            id={list.id}
            color={"#26234e"}
            del={this.delete}
            onPress={() => {
              this.props.navigation.navigate("Files", {
                folder: list.name
              });
            }}
          />
        </View>
      ) : (
        null
      )
    
    );

    const gfolders = this.state.folders.map(list =>
      list.class == screen.Id && this.props.groupName == list.name ? (
        <View key={list.id} style={styles.classes}>
          <Infobar2
            title={list.name}
            name={"folder"}
            id={list.id}
            color={"#26234e"}
            onPress={() => {
              this.props.navigation.navigate("Files", {
                folder: list.name
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
        <ScrollView
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
           {folders}
        </ScrollView>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("AddFolder")}
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
  },
  addView: {
    // marginTop: height - 50
  }
});

const mapPropToState = state => ({
  folders: state.Folders,
  screen: state.Screen,
  groupName: state.CurrentGroup
});

const mapActionToProp = {
  getFolders: get,
  delete: del,

};

export default connect(mapPropToState, mapActionToProp)(Folders);

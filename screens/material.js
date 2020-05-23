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

const { width, height } = Dimensions.get("window");
class GroupFolders extends React.Component {
  state = {
    folders: this.props.folders,
    refresh: ""
  };
  timer;


  componentDidMount() {
    try {
    //    this.timer = setInterval(() => {
    //   this.setState({ groups: this.props.groups });
    // }, 10000);

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
      // clearInterval(this.timer);
    this.willFocusSubscription.remove()
    } catch (error) {
      console.log(error)
    }

  }

  delete = (id)=>{
    // console.log('del',id)
    this.props.delete(id)
    this.setState({refresh: true})
  }

  static navigationOptions = ({ navigation }) => {
    // console.log(navigation);
    return {
      
      header: null
    };
  };
  render() {
    const name = this.props.screenName;
    // console.log('sub', name)
    // console.log("con " + JSON.stringify(this.state.folders));
    const screen = this.props.screen;
    const all = this.state.folders.filter(function(obj) {
      return obj.class == screen;
    });

    const folders = this.state.folders.map((list,idx) =>
    list.class == name.classId  && name.name == list.groups ? (
        <View key={idx} style={styles.classes}>
          <Infobar2
            title={list.name}
            name={"folder"}
            id={list.id}
            del={this.delete}
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
          // refreshControl={
          //   <RefreshControl
          //     refreshing={this.state.refreshing}
          //     onRefresh={this.onRefresh}
          //   />
          // }
        >
          {folders}
        </ScrollView>

      
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
  classes: { padding: 10, width: width - 50, height: 100, fontFamily:"Roboto" },
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
  screenName: state.CurrentGroup
});

const mapActionToProp = {
  updateGroup: updateGroup,
  getFolders: get,
  delete: del
};

export default connect(mapPropToState, mapActionToProp)(GroupFolders);

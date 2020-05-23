import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Dimensions,
  StatusBar
} from "react-native";
import InfoBar from "../components/newClass/infoBar";
import { MonoText } from "../components/StyledText";
import Nav from "../TeacherNavigation/switchNav";
import { connect } from "react-redux";
import updatescreen from "../actions/screenAction";
import * as SQLite from "expo-sqlite";
import { Ionicons } from "@expo/vector-icons";
import shorthash from 'shorthash';
import BlockIcon from "../components/blockIcon";
import Axios from "axios";
import { getbaseUrl } from "../components/requests";

const db = SQLite.openDatabase("db.db");
const { height, width } = Dimensions.get("window");

class AllStudents extends React.Component {
  state = {
    Classes: this.props.class,
    Student: this.props.students
  };
  componentWillMount() {
    this.startHeaderHeight = 80;
    if (Platform.OS == "android") {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
    }
  }

  componentDidMount(){
    console.log(this.state.Student)

  }





  static navigationOptions = ({ navigation }) => {
    return {
      title: "Classes",
    
    };
  };
  render() {
    return (
      <ScrollView >
        <StatusBar
          hidden={false}
        //   backgroundColor="white"
          translucent={true}
        //   barStyle="light-content"
        />
        <View style={styles.classes}>
          {this.state.Student.map((list,idx) =>(
          
              <BlockIcon
                title={list.name}
                key={idx}
                id={list.id}
                to={"Class"}
                color={"#26234e"}
                name={"person"}
                to={"Student"}
                style={styles.inputWrap}
          
            
              />
           
          )
          )}
        </View>
      </ScrollView>
    );
  }
}

const mapPropToState = state => ({
  screenName: state.Screen.class,
  class: state.Classes,
  students: state.Student,
});
const mapActionToState = {
  updateScreen: updatescreen
};

export default connect(mapPropToState, mapActionToState)(AllStudents);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },

  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 1
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb"
    // paddingVertical: 20
  },
  classBarText: {},
  classes: { 
      flex: 1,
      width:width,
      fontFamily:"Roboto",
      justifyContent: "space-around",
      alignItems: "center",
    },
  add: {
    width: 80,

    position: "absolute",
    bottom: 1,
    right: 8
  },
  option: { color: "#26234e", width:100 },
  inputWrap: {
    width:width,
    paddingTop: 34,
    borderRadius: 15,
    
  },
});

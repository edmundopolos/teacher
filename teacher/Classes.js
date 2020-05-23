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
  StatusBar,
  ActivityIndicator
} from "react-native";
import InfoBar from "../components/newClass/infoBar";
import { MonoText } from "../components/StyledText";
import Nav from "../TeacherNavigation/switchNav";
import { connect } from "react-redux";
import updatescreen from "../actions/screenAction";
import * as SQLite from "expo-sqlite";
import { Ionicons } from "@expo/vector-icons";
import {get} from '../actions/postActions'
import { getbaseUrl } from "../components/requests";
import Axios from "axios";
import updateStudent from "../actions/studentActions";
import updateParent from "../actions/parent";




const db = SQLite.openDatabase("db.db");
const { height, width } = Dimensions.get("window");

class Classes extends React.Component {
  state = {
    Classes: [],
    isLoading: true
  };
 
  componentWillMount() {
    // this.startHeaderHeight = 80;
    // if (Platform.OS == "android") {
    //   this.startHeaderHeight = 100 + StatusBar.currentHeight;
    // }
    this.props.getPosts()

   
  }

 async componentDidMount(){
// this.props.updateTeacher(this.props.user)this.props.user.id
// console.log(this.props.user)
 
  try {
    let response = await fetch(`${getbaseUrl}/teacher/${this.props.user[0]['user_id']}`);
    var json = await response.json();

    this.props.updateParent(json.parents)

    this.setState({Classes: json.subjects});
     this.setState({isLoading: false})
  } catch (error) {
    console.error(error);
  
}


  }

  submit(name) {
    // console.log(name + "stuff");
    this.props.updateScreen(name);
  }

 async studentUpdate(data){
    let students = await fetch(`${getbaseUrl}/class_students/${data.ClassId}`);
    let studentData = await students.json() 
        
    var a = []
          for (let i = 0; i < studentData.length; i++) {
            //  console.log(studentData[i]['class'][0]['ClassId'] , data.SectionId)
            if (studentData[i]['class'][0]['SectionId'] == data.SectionId) {
            //  console.log(studentData[i]['Id'].toString())
             studentData[i]['Id'] = studentData[i]['Id'].toString()
              a.push(studentData[i])
            }
            
          }
           
       
          
         this.props.updateStudent(a) 
         
  }



  static navigationOptions = ({ navigation }) => {
    return {
      title: "Classes",
      headerRight: (
        <TouchableOpacity
          onPress={() =>
            db.exec(
              [
                {
                  sql: "drop table user;",
                  args: []
                }
              ],
              false,
              (tx, results) => {
                navigation.navigate("Welcome");
              }
            )
          }
        >
          <Ionicons
            size={20}
            color={"#000"}
            name={Platform.OS === "ios" ? "ios-exit" : "md-exit"}
            style={{ paddingRight: 30 }}
          />
        </TouchableOpacity>
      )
    };
  };
  render() {
      
    const data = this.state.Classes

    const classes = 
      this.state.Classes  ? data.map((list,idx) => (
            <View style={styles.classes} key={idx}>
              <InfoBar
                title={list.Name}
                sub={list.SectionName}
                name={"md-journal"}
                id={list.id}
                to={"Class"}
                color={"#26234e"}
                data={this.submit}
                onPress={() => {
                  this.submit(list);
                  this.studentUpdate(list)
                  this.props.navigation.navigate("Class", {
                    name: list,
                    user: this.props.user
                  });
                  
                }}
              />
              </View>
              )):null
              

    return (
      <View style={styles.container}>
        {/* <StatusBar
          hidden={false}
          backgroundColor="#26234e"
          translucent={true}
          barStyle="dark-content"
         
        /> */}
        <StatusBar
          barStyle="dark-content"
          // dark-content, light-content and default
          hidden={false}
          //To hide statusBar
          backgroundColor="#fff"
          //Background color of statusBar
          translucent={false}
          //allowing light, but not detailed shapes
          networkActivityIndicatorVisible={true}
        />
        <ScrollView>
          {classes}
          {this.state.isLoading?<ActivityIndicator style={{marginTop: height/2}}/>:null}
        </ScrollView>
      </View>
    );
  }
}

const mapPropToState = state => ({
  screenName: state.Screen.class,
  class: state.Teacher,
  user: state.User
});
const mapActionToState = {
  updateScreen: updatescreen,
  getPosts: get,

  updateStudent: updateStudent,
  updateParent: updateParent
};

export default connect(mapPropToState, mapActionToState)(Classes);

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
  classes: { padding: 10, width: width - 20, height: 100, fontFamily:"Roboto" },
  add: {
    width: 80,

    position: "absolute",
    bottom: 1,
    right: 8
  }
});

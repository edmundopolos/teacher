import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image
} from "react-native";
import * as SQLite from "expo-sqlite";
import updateLogin from "../actions/loginAction";
import {connect} from 'react-redux'


const db = SQLite.openDatabase("db.db");

const { width, height } = Dimensions.get("window");
class Welcome extends Component {
  state = {
    Parent: false,
    Teacher: false,
    Student: false
  };
  render() {
    db.exec(
      [
        {
          sql:
          "CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT,username VARCHAR(45) NOT NULL,password VARCHAR(45) NOT NULL,usertype VARCHAR(45) NOT NULL, token VARCHAR(45) DEFAULT NULL,  avatar VARCHAR(100) DEFAULT NULL,user_id INTEGER NOT NULL);",
          args: []
        }
      ],
      false,
      (tx, results) => {
        // console.log("Results", results);
      }
    );
    db.exec(
      [
        {
          sql: "select * from user;",
          args: []
        }
      ],
      false,
      (tx, results) => {
        // console.log("Resulted", results);
        if (results[0].rows.length > 0) {
          switch (results[0].rows[0].usertype) {
           
            case "Parent":
              this.props.navigation.navigate("Parent");
              break;
            case "Student":
              this.props.navigation.navigate("Student");
              break;
            case "Teacher":
              this.props.navigation.navigate("Teacher");
              break;
            default:
              return;
              break;
          }
        }
      }
    );

    const check = () => db.exec(
      [
        {
          sql: "select * from user;",
          args: []
        }
      ],
      false,
      (tx, results) => {
        // console.log("Results", results[0].rows.length);
        if (results[0].rows.length > 0) {
          switch (results[0].rows[0].usertype) {
           
            case "Parents":
              this.props.navigation.navigate("Parent");
              break;
            case "Student":
              this.props.navigation.navigate("Student");
              break;
            case "Teacher":
              this.props.navigation.navigate("Teacher");
              break;
            default:
              return '';
              break;
        }
      }
    }
    );
    return (
      check()?check():
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.btn}>
            <TouchableOpacity
              onPress={() => {this.props.navigation.navigate("Login")
            this.props.usertype("Parent")
            }}
            >
              <Text style={styles.text}>Parent</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btn}>
            <TouchableOpacity
              onPress={() => {this.props.navigation.navigate("Login",{usertype: "Teacher"})
              this.props.usertype("Teacher")
            }}
            >
              <Text style={styles.text}>Teacher</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btn}>
            <TouchableOpacity
              onPress={() => {this.props.navigation.navigate("Login",{usertype: "Student"})
              this.props.usertype("Student")
            }}
            >
              <Text style={styles.text}>Student</Text>
            </TouchableOpacity>
         
          </View>
        <Text style={{fontFamily:"Roboto", fontSize:10,marginTop:70}}>Powered By</Text>
          <Image source={require('../assets/mschool-splash.png')} style={styles.logo}/>
        </View>
         

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    height: height,
    backgroundColor: "white"
  },
  content: {
    marginTop: 200,
    justifyContent: "space-around",
    alignItems: "center"
  },
  btn: {
    height: 40,
    width: 80,
    borderRadius: 15,
    elevation: 1,
    backgroundColor: "#69a4ec",
    marginTop: 20,
    justifyContent: "space-around",
    alignItems: "center"
  },
  text: {color: "#fff"},
  logo:{
    justifyContent:"space-around",
    alignItems:"center",
    width:width,
    height:200,
    marginTop:10
  }
});

mapActionToState =({
  usertype:updateLogin
})

export default connect(null,mapActionToState)(Welcome);
{
  /* <ImageBackground
          source={{ uri: "./building.jpg" }}
          style={{ width: "100%", height: "100%" }}
        >
          <Text>Inside</Text>
        </ImageBackground> */
}

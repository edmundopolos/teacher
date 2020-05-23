import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
  Platform,
  Button
} from "react-native";
import TabBarIcon from "../components/TabBarIcon";
import { Ionicons } from "@expo/vector-icons";
import TextIn from "../components/textInputs/textInput";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.db");

const { width, height } = Dimensions.get("window");
class Login extends React.Component {
  state = {
    username: null,
    password: null,
    usertype: "Teacher"
  };

  submit() {
    const { username, usertype, password } = this.state;
    if (username == null && password == null) {
      ToastAndroid.showWithGravityAndOffset(
        "Kindly input username & password",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
      return null;
    } else {
      db.exec(
        [
          {
            sql:
              "insert into user (username,password,usertype) values (?,?,?);",
            args: [username, password, usertype]
          }
        ],
        false,
        (tx, results) => {
          // console.log("k", results);
          // console.log("Results", results[0].rowsAffected);
          if (results[0].rowsAffected > 0) {
            this.props.navigation.navigate("Main");
          }
        }
      );
    }
  }
  render() {
    db.exec(
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
          this.props.navigation.navigate("Main");
        }
      }
    );

    return (
      <ImageBackground
        source={require("../assets/mschool2.png")}
        style={{ flex: 1, width: "100%", height: "100%" }}
      >
        <View style={styles.inputContainer}>
          <View>
            <Text style={styles.logoText}> Mschool</Text>
          </View>

          <TextIn
            android="person"
            iso="person-outline"
            focused="false"
            placeholder="username"
            placeholderTextColor="black"
            onChangeText={text => this.setState({ username: text })}
            underlineColorAndroid="transparent"
            autoCapitalize={"none"}
            style={{ backgroundColor: "white" }}
          />

          <TextIn
            ios="lock"
            android="lock"
            focused="false"
            secureTextEntry={true}
            placeholder="password"
            placeholderTextColor="black"
            onChangeText={text => this.setState({ password: text })}
            underlineColorAndroid="transparent"
            autoCapitalize={"none"}
            style={{ backgroundColor: "white" }}
          />
          <View style={styles.inputWrap}>
            <Button
              title={"submit"}
              color={"rgba(214, 182, 0, 1)"}
              onPress={() => {
                // this.props.navigation.navigate("Main");
                this.submit();
              }}
            >
              <Text>Login</Text>
            </Button>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Welcome')}}>
              <Text style={{padding:10}}>
                Go Back
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
    borderRadius: 45,
    borderBottomWidth: 1,
    backgroundColor: "transparent",

    height: 35,
    paddingLeft: 45,
    fontSize: 20
  },
  inputContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.59)",
    height: height,
    width: width,
    alignItems: "center"
  },
  inputIcon: {
    position: "absolute",
    top: 5,
    left: 15
  },
  inputWrap: {
    marginTop: 50
  },
  logoText: {
    paddingTop: 50,
    fontSize: 50,
    fontWeight: "500"
  }
});

export default Login;

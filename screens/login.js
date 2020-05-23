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
  Button,
  ActivityIndicator
} from "react-native";
import TabBarIcon from "../components/TabBarIcon";
import { Ionicons } from "@expo/vector-icons";
import TextIn from "../components/textInputs/textInput";
import * as SQLite from "expo-sqlite";
import Axios from 'axios'
import {connect} from 'react-redux'
import updateLogin, { add } from "../actions/loginAction";
import { baseUrl, postBaseUrl, getbaseUrl } from "../components/requests";
import PushNotifications from "../components/pushNotification";
 
const db = SQLite.openDatabase("db.db");

const { width, height } = Dimensions.get("window");
class Login extends React.Component {
  state = {
    username: null,
    password: null,
    usertype: "Teacher",
    message: '',
    isLoading: false,
    invalid: false
  };

  componentDidMount(){
  }
  login = (username,password,role) => {
    this.props.login(username,password,role)
  }
  

  submit() {
    setImmediate
    this.setState({isLoading : true, invalid:false})
    const { username, usertype, password } = this.state;
    if (username == null || password == null) {
      this.setState({isLoading : false})
      ToastAndroid.showWithGravityAndOffset(
        "Kindly input username & password",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
      return null;
    } else {
      
       const push = new PushNotifications
          push.registerForPushNotificationsAsync()
          const token = push.getToken()
          console.log(token)
      
      Axios.post(`${getbaseUrl}/user`, {"username":username, "password": password},{
        headers: {'Content-Type': 'application/json'}})
        .then(response => {
          // console.log(response.data)
          if (JSON.stringify(response.status) == '200' ) {
          let {name,password,role,id} = response.data
         
          const data = {
            'username': name,
            'user_id': id,
            'usertype': role,
            'avatar': '',
            'token': ''
          }
            Axios.post(`${postBaseUrl}/user/`, data)
            .then(function (response) {
            // console.log('post',response.data);
            if (response.status == 201 ||  response.status == 200) {
              console.log('check avatar',response.data)
              this.props.login(response.data)
            }
            
            }.bind(this))
            .catch(function (error) {
            console.log(error);
            });

       if (name == null ) {
        this.setState({message: 'error',message: 'error',invalid: true})
        return
       }
        else{
        db.exec(
        [
          {
            sql:
              "insert into user (username,password,usertype,user_id) values (?,?,?,?);",
            args: [name, 'password', role, id]
          }
        ],
        false,
        (tx, results) => {
          // console.log("k", results);
          // console.log("Results", results[0].rowsAffected);
          if (results[0].rowsAffected > 0) {
             this.setState({message:"success",isLoading:false});
             this.login(username,password,role);
          }
        }
      );  
        
       }
      
            
          }else{
            
            alert("error inserting!!!!")
          }
          
           
        }
        )
        .catch(error => {
          console.log(error)
          this.setState({message: error.message,invalid: true, isLoading: false})
          // alert("red!!!!")
           
      // ToastAndroid.showWithGravityAndOffset(
      //   "Kindly input valid username & password",
      //   ToastAndroid.LONG,
      //   ToastAndroid.BOTTOM,
      //   25,
      //   50
      // );
      // return null;
    
        })
        .then(function () {
          // always executed
        });
    }
    this.setState({message:"refresh"})
  }
  render() {
   
    
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
              
        }
      }
    }
    );
  
    

    return (
      check()?check():<ImageBackground
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
            <View>
               {this.state.isLoading?<ActivityIndicator/>: null}
            {this.state.invalid?this.state.message == 'Network Error'?
            <Text>{JSON.stringify(this.state.message)}</Text>:
            <Text>Invalid username or password </Text>
            : null}
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

mapPropToState = state =>({
  Getusertype: state.User
})

mapActionToState ={
  login : updateLogin,
  update: add
}

export default connect(null,mapActionToState) (Login);

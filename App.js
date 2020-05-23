import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useState } from "react";
import { Platform, StatusBar, StyleSheet, View, Alert, ToastAndroid } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import * as FileSystem from 'expo-file-system';
import { createStore, compose, applyMiddleware} from "redux";
import reducers from "./reducers";
import * as SQLite from "expo-sqlite";
import AppNav from "./navigation/AppNav";
import * as Network from 'expo-network';
import thunk from 'redux-thunk';
import { get } from "./actions/groupActions";
import PushNotifications from "./components/pushNotification";


export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const db = SQLite.openDatabase("db.db");
  const stat = StatusBar.currentHeight
  // console.log(stat)
  // const allEnhancers = compose(
    
  // )
  const push = new PushNotifications;
  push.registerForPushNotificationsAsync();
  const store = createStore(reducers, applyMiddleware(thunk));
  if (!isLoadingComplete && !props.skipLoadingScreen) {
    

    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />

    );
  } else {
    db.exec(
      [
        {
          sql:
            "CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT,fname VARCHAR(45) NOT NULL,lname VARCHAR(45) NOT NULL,class VARCHAR(45) NOT NULL);",
          args: []
        },
        {
          sql:
            "CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR(45) NOT NULL,class VARCHAR(45) NOT NULL);",
          args: []
        },
        {
          sql:
            "CREATE TABLE IF NOT EXISTS folder (id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR(45) NOT NULL, class VARCHAR(45) NOT NULL, groups  VARCHAR(45) NOT NULL );",
          args: []
        },
        {
          sql:
            "CREATE TABLE IF NOT EXISTS files (id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR(255) NOT NULL, class VARCHAR(45) NOT NULL, groups  VARCHAR(45) NULL,uri VARCHAR(255) NOT NULL,size VARCHAR(45) NOT NULL,folder VARCHAR(45) NULL);",
          args: []
        },
        {
          sql:
            "CREATE TABLE IF NOT EXISTS post (id INTEGER PRIMARY KEY AUTOINCREMENT,created DATETIME NOT NULL,title VARCHAR(45) NOT NULL,message VARCHAR(255) NOT NULL,source VARCHAR(45) NOT NULL,groups  VARCHAR(45) NULL);",
          args: []
        },
        {
          sql:
            "CREATE TABLE  IF NOT EXISTS addto (id INTEGER PRIMARY KEY AUTOINCREMENT,groups id INT NOT NULL,studentid INT NOT NULL,`when` DATETIME NOT NULL);",
          args: []
        },
        // {
        //   sql:
        //     "CREATE TABLE  user (id INTEGER PRIMARY KEY AUTOINCREMENT,username VARCHAR(45) NOT NULL,password VARCHAR(45) NOT NULL,usertype VARCHAR(45) NOT NULL, token VARCHAR(100) DEFAULT NULL,  formTeacher VARCHAR(100) DEFAULT NULL);",
        //   args: []
        // },
        {
          sql:
            "CREATE TABLE IF NOT EXISTS  student (id INTEGER PRIMARY KEY AUTOINCREMENT,username VARCHAR(45) NOT NULL,password VARCHAR(45) NOT NULL,parentid VARCHAR(45) DEFAULT NULL,name VARCHAR(45) NOT NULL,department VARCHAR(45) NOT NULL);",
          args: []
        },
        {
          sql:
            "CREATE TABLE IF NOT EXISTS  parent (id INTEGER PRIMARY KEY AUTOINCREMENT,username VARCHAR(45) NOT NULL,password VARCHAR(45) NOT NULL,wardId VARCHAR(45) DEFAULT NULL,name VARCHAR(45) NOT NULL);",
          args: []
        },
        {
          sql:
            "CREATE TABLE IF NOT EXISTS  classStudent (id INTEGER PRIMARY KEY AUTOINCREMENT,title VARCHAR(45) NOT NULL,classId INTEGER NOT NULL,studentId VARCHAR(45) NOT NULL,created VARCHAR(45) NOT NULL);",
          args: []
        },
        {
          sql:
            "CREATE TABLE IF NOT EXISTS  classGroup (id INTEGER PRIMARY KEY AUTOINCREMENT,max VARCHAR(45) DEFAULT NULL,classId INTEGER NOT NULL,purpose VARCHAR(45) NOT NULL,created VARCHAR(45) DEFAULT NULL,name VARCHAR(45) NOT NULL,class VARCHAR(45) NOT NULL);",
          args: []
        },
        {
          sql:
            "CREATE TABLE IF NOT EXISTS  studentGroup (id INTEGER PRIMARY KEY AUTOINCREMENT,title VARCHAR(45) NOT NULL,classId INTEGER NOT NULL,studentId INTEGER NOT NULL,purpose VARCHAR(45) NOT NULL);",
          args: []
        },
        {
          sql:
            "CREATE TABLE IF NOT EXISTS  assignment (id INTEGER PRIMARY KEY AUTOINCREMENT,title VARCHAR(45) NOT NULL,classId INTEGER NOT NULL,uri VARCHAR(45) NOT NULL,guide VARCHAR(45) NOT NULL, duedate VARCHAR(45) NOT NULL, created VARCHAR(225) NOT NULL, groupId INTEGER);",
          args: []
        },
        {
          sql:
            "CREATE TABLE IF NOT EXISTS  teacher (id INTEGER PRIMARY KEY AUTOINCREMENT,fname VARCHAR(45) NOT NULL,lname VARCHAR(45) NOT NULL,class VARCHAR(45) NOT NULL);",
          args: []
        },
        {
          sql:
            "CREATE TABLE IF NOT EXISTS  messages (id INTEGER PRIMARY KEY AUTOINCREMENT,message VARCHAR(100) NOT NULL,recepient INTEGER NOT NULL,sender INTEGER NOT NULL);",
          args: []
        },
        {
          sql:
            "CREATE TABLE IF NOT EXISTS  assignmentfile (id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR(45) NOT NULL,assignmentId INTEGER NOT NULL,uri VARCHAR(45) NOT NULL,created DATETIME NOT NULL);",
          args: []
        },
        {
          sql:
            "CREATE TABLE IF NOT EXISTS  settings (id INTEGER PRIMARY KEY AUTOINCREMENT,iconColour VARCHAR(45) NOT NULL,notification VARCHAR(45) NOT NULL, dp VARCHAR(45) NOT NULL, admin VARCHAR(45) NOT NULL);",
          args: []
        },
        {
          sql:
          "CREATE TABLE IF NOT EXISTS  quiz (id INTEGER PRIMARY KEY AUTOINCREMENT,title VARCHAR(45) NOT NULL,classId INTEGER NOT NULL,uri VARCHAR(45) NOT NULL,guide VARCHAR(45) NOT NULL, duedate VARCHAR(45) NOT NULL, created VARCHAR(225) NOT NULL, groupId INTEGER);",
          args: []
        },
        
        // {
        //   sql:
        //     "CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT,username VARCHAR(45) NOT NULL,password VARCHAR(45) NOT NULL,usertype VARCHAR(45) NOT NULL, token VARCHAR(45) DEFAULT NULL,  avatar VARCHAR(100) DEFAULT NULL,user_id INTEGER NOT NULL);",
        //   args: []
        // },
        
        {
          sql:
            "CREATE TABLE IF NOT EXISTS post (id INTEGER PRIMARY KEY AUTOINCREMENT,username VARCHAR(45) NOT NULL,message VARCHAR(45) NOT NULL,usertype VARCHAR(45) NOT NULL, groupId VARCHAR(45) DEFAULT NULL,  feed VARCHAR(100) DEFAULT NULL,created DATETIME NOT NULL);",
          args: []
        }
        ,
        {
          sql:
            "CREATE TABLE IF NOT EXISTS  postfile (id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR(45) NOT NULL,postId INTEGER NOT NULL,uri VARCHAR(45) NOT NULL,created DATETIME NOT NULL);",
          args: []
        },
        
        {
          sql:
            "CREATE TABLE IF NOT EXISTS  quizfile (id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR(45) NOT NULL,quizId INTEGER NOT NULL,uri VARCHAR(45) NOT NULL,created DATETIME NOT NULL);",
          args: []
        },
        {
          sql: "select * from post;",
          args: []
        }
      ],
      false,
      (tx, results) => {
        // console.log("R", results);
        if (results[0].rows.length < 0) {
        }
      }
    );
    get()
    // fileUri = 'file://Internal Storage/mschool/downloads'FileSystem.getInfoAsync(folder_path)
    // FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'downloads',{intermidiates:true})
    // const  folder = FileSystem.documentDirectory + 'mschool'
    // async function fetchForCache(folder){
    //   var folderInfo = await FileSystem.getInfoAsync(folder);    
    //   if (!folderInfo.exists) {await FileSystem.makeDirectoryAsync(folder)}
    //   else{
    //     console.log("yeasse",folderInfo)
    //   }; 
    
    // }
    // fetchForCache(folder)
    const checkNetwork = Network.getNetworkStateAsync()
 
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <StatusBar hidden={true} barStyle="dark-content" />
          {/* <StatusBar hidden={route.statusBarHidden} /> */}
          <AppNav />
          
        </View>  
         {checkNetwork.isConnected ?
      ToastAndroid.showWithGravityAndOffset(
        "No internet connection",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      ): null
      
    }
      </Provider>
    );
  }
}


async function loadResourcesAsync() {

  await Promise.all([
    Asset.loadAsync([
      require("./assets/images/robot-dev.png"),
      require("./assets/images/robot-prod.png")
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to 
      // remove this if you are not using it in your app
      "Lato-Italic": require("./assets/fonts/Lato-LightItalic.ttf"),
      "Roboto": require("./assets/fonts/Roboto-Regular.ttf"),
      "Roboto-Thin": require("./assets/fonts/Roboto-Thin.ttf"),
      "Lato": require("./assets/fonts/Lato-Light.ttf"),

    })
  ]);    

}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    fontFamily: "Lato"
  }
});

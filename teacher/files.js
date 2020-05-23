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
import * as DocumentPicker from "expo-document-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import createFile, { add } from "../actions/createFile";
import { del,get } from "../actions/createFile";
import * as FileSystem from 'expo-file-system';

const { width, height } = Dimensions.get("window");
class Files extends React.Component {
  state = {
    files: this.props.files,
    refresh: "",
    refreshing: false,
    folder: this.props.navigation.getParam("folder")
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

  componentDidMount() {
    timer = setInterval(() => {
      this.setRefreshing()
    }, 1000);
    this.setState({ refresh: true });
    this.getPermissionAsync();
    this.props.getFiles()
    const inState = this.state.files 
    if (this.props.files != inState){
      this.setState({
        files: this.props.files
      })
    }
  }

  componentWillUnmount() {
    clearInterval(timer);
  }

  setRefreshing() {
    const inState = this.state.files 
    if (this.props.files != inState){
      this.setState({
        files: this.props.files
      })
    }
  }

  
  delete = (id)=>{
    console.log('del',id)
    this.props.delete(id)
    this.setState({refresh: true})
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    let result = await DocumentPicker.getDocumentAsync();

    // console.log(result);
    const mime = {
      jpg:'image/jpg',
      png: 'image/png',
      pdf: 'application/pdf',
      docx: 'application/docx'
    }
    if (!result.cancelled) {
      const { folder } = this.state;
      var splitTest = function (str) {
        return str.split('\\').pop().split('/').pop().split('.').pop();
    }
    const type = mime[splitTest(result.name)]
      result['type'] = type
      // result["folder"] = folder;
      // result["screen"] = this.props.screen;
      this.submit(result);
      // alert(result.uri);
    }
  };

  submit(file) {
   let {folder} = this.state
   let data = {
     name: file.name,
     folder : folder,
     class: this.props.screen.Id,
     size: '',
     groups: ''
   }
   let upload = new FormData()
   upload.append('message',JSON.stringify(data))
   upload.append('doc',file)
    this.props.sendFile(upload);
  }

  render() {
    const screen = this.props.screen;
    // console.log('file',screen)
    const all = this.props.files.filter(function(obj) {
      // console.log("con " + obj.class);

      return obj.class == screen;
    });

    const files = this.state.files.map((list,idx) =>
      list.folder == this.props.navigation.getParam("folder") ? (
        <View key={list._id} style={styles.classes}>
          <Infobar2
            title={list.name}
            name={"document"}
            id={list._id}
            color={"green"}
            del={this.delete}
            onPress={() => {
              FileSystem.downloadAsync(
                list.uri,
                FileSystem.documentDirectory+list.name,
              ) .then(({ uri }) => {
                console.log('Finished downloading to ', uri);
              })
              .catch(error => {
                console.error(error);
              })
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

        <ScrollView
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          <View>{files}</View>
        </ScrollView>
        <TouchableOpacity onPress={() => this._pickImage()} style={styles.add}>
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
  files: state.Files,
  screen: state.Screen
});

const mapActionToProp = {
  addFile: createFile,
  sendFile: add,
  delete: del,
  getFiles: get
};

export default connect(mapPropToState, mapActionToProp)(Files);

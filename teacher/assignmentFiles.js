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
import createFile from "../actions/createFile";
import addFile from "../actions/addFile";

const { width, height } = Dimensions.get("window");
class AssignmentFiles extends React.Component {
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
      this.setState({ groups: this.props.files });
    }, 10000);
    this.setState({ refresh: true });
    this.getPermissionAsync();
  }

  componentWillUnmount() {
    clearInterval(timer);
  }

  setRefreshing() {
    this.setState({ refreshing: !this.state.refreshing });
    // setTimeout(this.setState({ refreshing: !this.state.refreshing }), 1000);
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

    if (!result.cancelled) {
      const { folder } = this.state;
      result["folder"] = folder;
      result["screen"] = this.props.screen;
      this.submit(result);
      // alert(result.uri);
    }
  };

  submit(file) {
    this.props.addFile(file);
  }

  static navigationOptions = { header: null };

  render() {
    const screen = this.props.screen;
    const all = this.props.files.filter(function(obj) {
      // console.log("con " + obj.class);

      return obj.class == screen;
    });

    const files = this.state.files.map(list =>
      list.folder == this.props.navigation.getParam("folder") ? (
        <View key={list._id} style={styles.classes}>
          <Infobar2
            title={list.name}
            name={"document"}
            id={list.id}
            color={"green"}
            onPress={() => {
              this.props.navigation.navigate("Create", {
                folder: list
              });
              this.props.addFile(list);
            }}
          />
        </View>
      ) : (
       null
      )
    );

    const name = this.props.navigation.getParam("folder");
    console.log(name)
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    height: height - 30
  },
  content: {
    marginTop: 10
  },
  classes: { padding: 30, width: width - 55 },
  add: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 50,
    height: 50,
    borderRadius: 15,
    borderColor: "#0f2331",
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 0.5,
    backgroundColor: "#0f2331"
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
  addFile: addFile
};

export default connect(mapPropToState, mapActionToProp)(AssignmentFiles);

import React, { Component } from "react";
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
  Image,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CreatePosts from "../components/createPost";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import TextIn from "./textInputs/textInput";

import updatePost from "../actions/postActions";
import { connect } from "react-redux";

const { height, width } = Dimensions.get("window");

class PostModal extends Component {
  state = {
    modalVisible: false,
    image: null,
    message: "",
    title: ""
  };

  setModalVisible() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }
  test(test) {
    if (test == true) {
      alert("test");
      return true;
    } else {
      return false;
    }
  }

  submit() {
    const { message, title, image } = this.state;
    const note = {
      message: message,
      title: title,
      image: image
    };
    this.props.onSubmit(note);
    this.props.navigation.navigate("Class");
  }
  render() {
    let { image } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.upload}>
          <TouchableOpacity onPress={() => this.setModalVisible()}>
            <Text style={styles.text}>
              {" "}
              <Ionicons
                size={24}
                name={
                  Platform.OS === "ios" ? "ios-add-circle" : "md-add-circle"
                }
                style={styles.icon}
                color={"black"}
              />
              {"  "} Post Something New
            </Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible();
          }}
          style={styles.modal}
        >
          <View style={styles.content}>
            <TouchableHighlight onPress={this._pickImage}>
              <Ionicons
                size={24}
                name={Platform.OS === "ios" ? "ios-camera" : "md-camera"}
                style={styles.icon}
                color={"black"}
              />
            </TouchableHighlight>
            <ScrollView>
              <View style={{ marginTop: 22 }}>
                <View>
                  {image && (
                    <Image
                      source={{
                        uri: image
                      }}
                      style={styles.img}
                    />
                  )}
                </View>
                <View>
                  <View style={styles.inputWrap}>
                    <TextIn
                      ios="create"
                      android="create"
                      focused="false"
                      placeholder="title"
                      placeholderTextColor="black"
                      onChangeText={text => this.setState({ title: text })}
                      underlineColorAndroid="transparent"
                      autoCapitalize={"none"}
                    />
                  </View>

                  <View style={styles.inputWrap}>
                    <TextIn
                      ios="create"
                      android="create"
                      focused="false"
                      placeholder="message"
                      placeholderTextColor="black"
                      onChangeText={text => this.setState({ message: text })}
                      underlineColorAndroid="transparent"
                      autoCapitalize={"none"}
                    />
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      this.setModalVisible();
                      this.submit();
                      // this.props.refresh();s
                    }}
                    style={styles.inputWrap}
                  >
                    <Text>Post</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  }
  componentDidMount() {
    this.getPermissionAsync();
    // console.log("hi");
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
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      // alert(result.uri);
    }
  };
}

const mapPropToState = state => ({
  post: state.Posts
});
const mapActionToState = {
  onSubmit: updatePost
};

export default connect(mapPropToState, mapActionToState)(PostModal);

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  content: {
    backgroundColor: "#fff",
    flex: 1,
    height: "100%",
    borderRadius: 25,
    height: height,
    marginTop: 150,
    justifyContent: "space-around",
    alignItems: "center"
  },
  upload: {
    flexDirection: "row",
    // backgroundColor: "#d3d3d3",
    width: width,
    // padding: 5,
    borderRadius: 10
  },
  post: {
    width: 300,

    justifyContent: "space-around",
    alignItems: "center"
  },

  img: {
    width: 200,
    height: 200,
    justifyContent: "space-around",
    alignItems: "center"
  },
  text: {
    fontSize: 20,
    marginLeft: 10,
    marginTop: 3
  },
  header: {
    shadowColor: "black",
    shadowOpacity: 0.5
  },
  title: {},
  inputWrap: {
    marginTop: 10,
    justifyContent: "space-around",
    alignItems: "center"
  },
  icon: {
    paddingTop: 20
  },
  modal: {
    marginTop: 50
  }
});

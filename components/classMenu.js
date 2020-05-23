import React, { Component } from "react";
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import TextIn from "./textInputs/textInput";

import updatePost from "../actions/postActions";
import { connect } from "react-redux";
import BlockIcon from "./blockIcon";

const { height, width } = Dimensions.get("window");

class MenuModal extends Component {
  state = {
    modalVisible: false,
    image: null,
    message: "",
    title: ""
  };

  setModalVisible() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  submit() {
    const { message, title, image } = this.state;
    const note = {
      message: message,
      title: title,
      image: image
    };
    this.props.onSubmit(note);
  }
  render() {

    // classData = this.props.navigation.getParam("name")


    return (
      <View style={styles.container}>
        <View style={styles.upload}>
          <TouchableOpacity
            onPress={() => this.setModalVisible()}
            style={{ flexDirection: "row" }}
          >
            <Text style={styles.text}>
              {" "}
              <Ionicons
                size={24}
                name={Platform.OS === "ios" ? "ios-menu" : "md-menu"}
                style={styles.icon}
                color={"black"}
              />
              {"  "}
            </Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          animated={true}
          opacity={0.5}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible();
          }}
          style={styles.Modalcontainer}
        >
          <TouchableOpacity
            onPress={() => {
              this.setState({ modalVisible: false });
            }}
            hitSlop={{
              top: 50,
              bottom: 50
            }}
          >
            <View
              style={[
                styles.Modalcontainer,
                {
                  height: 500
                  // borderRadius: 15
                }
              ]}
            ></View>
          </TouchableOpacity>

          <View style={styles.content}>
            
            <View style={styles.menu}>
              <View style={styles.inputWrap}>
                <TouchableOpacity
                  onPress={() => {
                    this.setModalVisible();
                  }}
                >
                  <BlockIcon
                    name={"people"}
                    title={"Groups"}
                    to={"Group"}
                    navigate={this.props.navigate}
                    style={styles.option}
                    onPress={() => {
                      this.props.navigate("Group", {
                        // name: classData
                        id: this.props.class,
                      });
                      this.setModalVisible();
                    }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    this.setModalVisible();
                  }}
                >
                  <BlockIcon
                    name={"copy"}
                    title={"Materials"}
                    to={"Material"}
                    style={styles.option}
                    onPress={() => {
                      this.props.navigate("Material", {
                        // name:classData
                        id: this.props.class,
                      });
                      this.setModalVisible();
                    }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    this.setModalVisible();
                  }}
                >
                  <BlockIcon
                    name={"clock"}
                    title={"Assignments"}
                    to={"Material"}
                    style={styles.option}
                    onPress={() => {
                      this.props.navigate("Assignment", {
                        // name:classData,
                        id: this.props.class,
                        class: this.props.class
                      });
                      this.setModalVisible();
                    }}
                  />
                </TouchableOpacity>

                
              </View>
              <View style={styles.inputWrap}>
              <TouchableOpacity
                  onPress={() => {
                    this.setModalVisible();
                  }}
                >
                  <BlockIcon
                    name={"person"}
                    title={"Students"}
                    to={"Student"}
                    style={styles.option}
                    onPress={() => {
                      this.props.navigate("Member", {
                      //  name: classData,
                      id: this.props.class,
                        class: this.props.class
                      });
                      this.setModalVisible();
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setModalVisible();
                  }}
                >
                  <BlockIcon
                    name={"paper"}
                    title={"Quiz"}
                    to={"Quiz"}
                    style={styles.option}
                    onPress={() => {
                      this.props.navigate("Quiz", {
                        // name: classData,
                        id: this.props.class,
                        class: this.props.class
                      });
                      this.setModalVisible();
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapPropToState = state => ({
  post: state.Posts
});
const mapActionToState = {
  onSubmit: updatePost
};

export default connect(mapPropToState, mapActionToState)(MenuModal);

const styles = StyleSheet.create({
  container: { flex: 1 },
  Modalcontainer: { backgroundColor: "#000", opacity: 0.5 },
  content: {
    // width: width,
    top: -200,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: height-50
  },
  modal: { backgroundColor: "#000", opacity: 0.5 },

  upload: { paddingRight: 20 },
  header: {
    shadowColor: "black",
    shadowOpacity: 0.5
  },
  inputWrap: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 34,

    borderRadius: 15
  },
  icon: {
    marginLeft: width/2,
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#d3d3d3",
    // left: 150,
    backgroundColor: "white",
    top: -15,
    borderRadius: 50,
    width: 50
  },
  option: { color: "#26234e" }
});

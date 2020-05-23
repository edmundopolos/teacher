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
import BlockIcon from "./blockIcon";
import updateGroup from "../actions/groupActions";
import { connect } from "react-redux";
import CreateGroup from "../teacher/forms/CreateGroup";

const { height, width } = Dimensions.get("window");

class GroupModal extends Component {
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
  }
  render() {
    let { image } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.upload}>
          <View style={{ flex: 1, paddingTop: 20 }}>
            <View style={styles.view}>
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible();
                }}
              >
                <BlockIcon
                  name={"person-add"}
                  title={"Select Members"}
                  to={"Select"}
                  navigate={this.props.navigate}
                  style={styles.group}
                />
              </TouchableOpacity>
            </View>
          </View>
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
          <ScrollView>
            <View style={styles.content}>
              <CreateGroup />

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
          </ScrollView>
        </Modal>
      </View>
    );
  }
}

const mapPropToState = state => ({
  post: state.Groups
});
const mapActionToState = {
  onSubmit: updateGroup
};

export default connect(mapPropToState, mapActionToState)(GroupModal);

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
  view: {
    justifyContent: "space-evenly",
    flexDirection: "row"
  },
  group: {
    paddingLeft: 15,
    width: 20
  },
  add: {
    paddingLeft: 5,
    width: 20
  },
  modal: {
    marginTop: 50
  }
});

import React from "react";
import {
  View,
  Text,
  Platform,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
  Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import { createAppContainer } from "react-navigation";
import TopBar from "../TeacherNavigation/TopBar";
// import Post from "./class/post";
import Header from "../components/header";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
// import GroupStack from "../navigation/groupNavigation";
import { connect } from "react-redux";
const { width, height } = Dimensions.get("window");

class GroupScreen extends React.Component {
  state = {
    post: this.props.posts,
    image: null,
    modalVisible: false,
    full: false
  };
  componentWillMount() {
    this.startHeaderHeight = 80;
    if (Platform.OS == "android") {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
    }
  }
  Open() {
    this.setState({
      modalVisible: { ...note }
    });
  }

  render() {
    // console.log(this.props.navigation.getParam("name"));
    let { image } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <TopBar />
      </View>
    );
  }
}

const mapPropToState = state => ({
  posts: state.Posts
});
export default connect(mapPropToState)(GroupScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1
  },
  upload: {
    flexDirection: "row",
    backgroundColor: "#d3d3d3",
    width: 100,
    padding: 5,
    borderRadius: 10,
    width: width - 30
  },
  post: {
    width: 300,
    height: 400,
    justifyContent: "space-around",
    alignItems: "center"
  },

  img: {
    backgroundColor: "red",
    width: 200,
    height: 200
  },
  text: {
    fontSize: 15,
    marginLeft: 10,
    marginTop: 3
  },
  header: {
    shadowColor: "black",
    shadowOpacity: 0.5
  },
  modal: { height: height - 100 }
});

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
import BlockIcon from "../components/blockIcon";
import updateGroup from "../actions/selectedGroup";
import Infobar from "../components/newClass/infoBar";

const { width, height } = Dimensions.get("window");
class AssignmentFolders extends React.Component {
  state = {
    folders: this.props.folders,
    refresh: ""
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
      this.setState({ groups: this.props.groups });
    }, 10000);

    this.setState({ refresh: true });
  }

  componentWillUnmount() {
    clearInterval(timer);
  }

  setRefreshing() {
    this.setState({ refreshing: !this.state.refreshing });
    // setTimeout(this.setState({ refreshing: !this.state.refreshing }), 1000);
  }

  static navigationOptions = ({ navigation }) => {
    // console.log(navigation);
    return {
      title: "Folders"
    };
  };
  render() {
    const screen = this.props.screen;
    const all = this.state.folders.filter(function(obj) {
      return obj.class == screen;
    });

    const folders = this.state.folders.map(list =>
      list.class == screen.Id && list.groups == ""  ? (
        <View key={list._id} style={styles.classes}>
          <Infobar2
            title={list.name}
            name={"folder"}
            id={list.id}
            color={"green"}
            onPress={() => {
              this.props.navigation.navigate("AllFiles", {
                folder: list.name
              });
            }}
          />
        </View>
      ) : (
        null
      )
    );
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
          {folders}
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
  folders: state.Folders,
  screen: state.Screen
});

const mapActionToProp = {
  updateGroup: updateGroup
};

export default connect(mapPropToState, mapActionToProp)(AssignmentFolders);

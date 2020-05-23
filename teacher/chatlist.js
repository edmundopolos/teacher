import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Teacher from "../components/chat";
import * as SQLite from "expo-sqlite";
import {connect}  from "react-redux";
// 

const { width, height } = Dimensions.get("window");
const db = SQLite.openDatabase("db.db");
class Parents extends React.Component {
  state = {
    parents: this.props.parents
  };

  componentDidMount() {
  
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Parents List",
      
    };
  };

  render() {
   
    const result = [];
    const map = new Map();
    for (const item of this.state.parents) {
        if(!map.has(item.UserId)){
            map.set(item.UserId, true);    // set any value to Map
            result.push({
                UserId: item.UserId,
                Name: item.Name,
                Student: item.Student
            });
        }
    }
    const data = result.map((list,idx) => (
        <Teacher
          key={idx}
          name={list.Name}
          class={list.Student}
          navigate={navigate}
          id={list.Parent_Id}
          onPress={() =>{
            this.props.navigation.navigate("Chat", { id: list.UserId,user: this.props.user[0], name: list.Name});
            // 
          }}
        />
      
        ));
    const navigate = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scroll} scrollEventThrottle={16}>
          {data}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1

    // height: height
  },
  scroll: {
    flex: 1,

    paddingBottom: 20
  },
  lists: {
    elevation: 1
  }
});
mapPropsToState = state =>({
  parents: state.Parent,
  user: state.User,
})

mapActionsToProps = {
  //
}

export default connect(mapPropsToState,mapActionsToProps) (Parents);

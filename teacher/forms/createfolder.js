import React, { Component } from "react";
import TextIn from "../../components/textInputs/textInput";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ToastAndroid
} from "react-native";
import Dropdown from "../../components/textInputs/picker";
import { connect } from "react-redux";
import createFolder,{add} from "../../actions/createFolder";

class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      class: this.props.screenName.Id,
      groups: ""

      //   class: this.props.screenName
    };
    this.press = this.press.bind(this);
  }

  press() {
    if (this.state.name != null) {
         this.props.onSubmit(this.state);
    this.props.navigation.navigate("Material");
    }else{
            ToastAndroid.showWithGravityAndOffset(
        "Kindly input name of folder",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
      return null;
    }
 
    
  }

  handleSelect = item =>{
   try {
      // console.log('itemselected',item)
    this.setState({groups: item.name})
   } catch (error) {
     console.log(error)
   }  
  }

  render() {
  // console.log("folder screen",this.props.screenName)
    const options =() =>{
     const a = [{name: this.props.screenName.Name,
                id: this.props.screenName.ClassId, group: false}];
    for (let i of this.props.groups) {
      // console.log("groups", i)
      
      a.push(i)
    }
    return a 
    }
    
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Create Folder</Text>

        <View>
          <TextIn
            ios={"folder"}
            android={"folder"}
            placeholder={"name"}
            placeholderTextColor="black"
            onChangeText={text => this.setState({ name: text })}
          />

          <Text style={{marginTop:20, padding:10, fontFamily: 'Lato'}}>Class/Group</Text><Dropdown name={'list'} options={options()} item={this.state} selected={this.handleSelect}/>

          <TouchableOpacity
            onPress={this.press}
            hitSlop={{
              top: 10,
              bottom: 10,
              left: 10,
              right: 10
            }}
            style={styles.button}
          >
            <Text>submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center"
  },
  button: {
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20
  },
  title: {
    fontFamily: "Lato",
    fontWeight: "300",
    fontSize: 30,
    paddingTop: 50
  }
});
const mapPropToState = state => ({
  posts: state.Posts,
  screenName: state.Screen,
  groups: state.Groups,
});

const mapActionToState = {
  onSubmit: add
};

export default connect(mapPropToState, mapActionToState)(AddFolder);

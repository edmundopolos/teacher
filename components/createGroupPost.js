import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  Image,
  Text,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  ToastAndroid
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as DocumentPicker from "expo-document-picker";
import updatePost, { add } from "../actions/postActions";
import { connect } from "react-redux";
import { NavigationEvents } from "react-navigation";
import * as SQLite from "expo-sqlite";
import { TextInput } from "react-native-gesture-handler";
import CacheImage from "./imageCache";
import Cam from "./camera";

const db = SQLite.openDatabase("db.db");

const { width } = Dimensions.get("window");
class CreateGroupPosts extends React.Component {
  k;
  state = {
    image: null,
    title: "",
    message: null,
    username: "",
    group: '',
    cam: false,
    doc:null,
    docUri:""
  };

  updateImage = () =>{
    try {
      console.log('image',this.props.navigation.getParam('image'))
      let newUri = this.props.navigation.getParam('image')
        if (newUri) {
          
          this.setState({image: newUri })
        }
    } catch (error) {
      console.log("image error", error)
    }

  }

  _pickDoc = async () => {
    let result = await DocumentPicker.getDocumentAsync({type: "application/*"});
    var split = function (str) {
      return str.split('\\').pop().split('/').pop().split('.').pop();
  }
    
    if (!result.cancelled) {
      var ext = split(result.uri)
      result['type'] = 'application/'+ext
      this.setState({ doc: result.name, docUri: result.uri });
      // alert(result.name);
    }
  };
removeDoc = ()=>{
  this.setState({doc: null})
}

feedback(response){
  console.log(response)
if (response) {
            
       
  }else{
    ShowAlert('Post','unable to add post')
  }
  
}

  submit(feedback) {
    
        const groupStuff = this.props.screenName
    console.log("naame",groupStuff["classId"]);
    const { message, title, image, username, doc,docUri } = this.state;

    const note = {
      message: message,
      title: title,
      image: image,
      teacher_id: this.props.screen.TeacherId,
      username: username,
      group: groupStuff["id"],
      classId: groupStuff["classId"],
      doc: doc,
      docUri: docUri,
      feed:'',
      userType: '',
      created: new Date()
    };
    
    if (message != null) {
      this.props.onSubmit(note,feedback);
      this.props.navigation.navigate("Post");
    }else if (message == null && image == null) {
      ToastAndroid.showWithGravityAndOffset(
        "Kindly add a message or image",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
      return null;
    }
  }
 static navigationOptions ={header:null}
  render() {
    let navigate = this.props.navigation
    console.log('testing',this.props.navigation.getParam('uri'))
    
    
    let { image,doc } = this.state;
    // alert(image);
    return (
      <View style={styles.content}>

        <NavigationEvents
         onDidFocus={() =>{
           this.updateImage()
          
       }}
        />
       
        <ScrollView>
         <KeyboardAvoidingView>
          <View>
            <View style={styles.user}>
              <View style={styles.username}>
                <Text  style={{
                  fontFamily: "Lato",color:"#fff"}}>{this.state.username}</Text>
              </View>
            </View>

            <View style={styles.inputWrap}>
              
              <TextInput
                ios="create"
                android="create"
                focused="false"
                placeholder="share something"
                placeholderTextColor="#d3d3d3"
                onChangeText={text => this.setState({ message: text })}
                underlineColorAndroid="transparent"
                autoCapitalize={"words"}
                multiline={true}
                numberOfLines={4}
                style={{
                  fontFamily: "Lato"}}
              />
            </View>
          </View>  
          <View>
            {image ? (
              image && (
                <Image
        
                  source={{
                    uri: image
                  }}
                  style={styles.img}
                />
              )
            ) : (
              <View></View>
            )}

            {this.state.doc != null? 
      <View  style={styles.attachment}>
        <Text style={{ width: 200 }}> {this.state.doc} </Text>
        <TouchableOpacity
          onPress={() => {
            this.removeDoc();
          }}
          hitSlop={{
            top: 10,
            bottom: 10,
            left: 10,
            right: 10
          }}
        >
          <Text>x</Text>
        </TouchableOpacity>
      </View>:<View></View>}
    
          </View>
         
       </KeyboardAvoidingView>

        </ScrollView>
        <View style={styles.image}>
          <TouchableOpacity onPress={this._pickDoc} hitSlop={{
            top:20,
            left:20,
            right:20,
            bottom:20
          }}>
            <Ionicons
              size={24}
              name={Platform.OS === "ios" ? "ios-attach" : "md-attach"}
              style={styles.icon}
              color={"#26234e"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            title={"Post"}
            onPress={() => {
              this.props.navigation.navigate("Camera",{from: navigate.state.routeName})
            }}
            // style={styles.inputWrap}
          >
          <Text
              style={{
                alignItems: "flex-start"
              }}
            >
              <Ionicons
                size={24}
                name={Platform.OS === "ios" ? "ios-camera" : "md-camera"}
                style={styles.icon}
                color={"#26234e"}
              />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            title={"Post"}
            onPress={() => {
              this.submit();
              this.props.navigation.navigate("class");
            }}
            // style={styles.inputWrap}
          >
            <Text
              style={{
                alignItems: "flex-start"
              }}
            >
              <Ionicons
                size={24}
                name={Platform.OS === "ios" ? "ios-send" : "md-send"}
                style={styles.icon}
                color={"#26234e"}
              />
            </Text>
          </TouchableOpacity>
       </View>
       </View>
    );
  }
  componentDidMount() {
    if (this.props.navigation.getParam("name")) {
      this.setState({ group: this.props.navigation.getParam("name") });
    }
    this.getPermissionAsync();
    db.exec(
      [
        {
          sql: "select * from user;",
          args: []
        }
      ],
      false,
      (tx, results) => {
        this.k = results[0].rows[0].username;
        this.setState({ username: results[0].rows[0].username });
        // return k;
      }
    );

    // console.log("hi");
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
    if (Constants.platform.android) {
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
      aspect: [4, 4],
      quality: 1
    });

    // console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      // alert(result.uri);
    }
  };
}

const mapPropToState = state => ({
  post: state.Posts,
  screenName: state.CurrentGroup,
  screen: state.Screen
});
const mapActionToState = {
  onSubmit: add
};

export default connect(mapPropToState, mapActionToState)(CreateGroupPosts);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    width: width,

    marginTop: 10,
    justifyContent: "space-around"
    // alignItems: "center"
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
    justifyContent: "space-around"
    // alignItems: "center"
  },

  img: {
    width: 200,
    height: 200,
    // alignItems: "center",
    marginLeft: 50
  },
  text: {
    fontSize: 15,
    marginLeft: 10,
    marginTop: 3,
    fontFamily: "Lato"
  },
  header: {
    shadowColor: "black",
    shadowOpacity: 0.5
  },
  title: {},
  inputWrap: {
    justifyContent: "space-around",
    paddingLeft: 20
  },
  icon: {
    alignItems: "flex-start",
    right: 15
  },
  username: {
    minWidth: 50,
    maxWidth:200,
    height: 50,
    borderRadius: 100,
    backgroundColor: "#26234e",
    marginLeft: 30,
    justifyContent: "space-around",
    alignItems: "center"
  },
  user: {
    height: 100,
    width: width,
    borderBottomWidth: 0.5,
    borderBottomColor: "#d3d3d3",
    justifyContent: "space-around"
    // alignItems: "center"
  },
  image: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems:"center",
    paddingBottom: 10,
    paddingLeft: 10
  },
  attachment:{
    marginTop: 50,
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center"
  }
});

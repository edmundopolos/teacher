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
import {addComment} from "../actions/postActions";
import { connect } from "react-redux";
import { NavigationEvents } from "react-navigation";
import * as SQLite from "expo-sqlite";
import { TextInput } from "react-native-gesture-handler";
import CacheImage from "./imageCache";
import Cam from "./camera";
import { ShowAlert } from "./alert";


const db = SQLite.openDatabase("db.db");

const { width } = Dimensions.get("window");
class CreateComment extends React.Component {
  k;
  state = {
    image: null,
    title: "",
    message: null,
    username: "",
    group: "",
    cam: false,
    doc:null,
    docUri:"",
    feed: "",
    userType: "",
  };

  updateImage = () =>{
    try {
      console.log('image',this.props.navigation.getParam('image'))
      let newUri = this.props.navigation.getParam('image')
        if (newUri) {
          // if(this.state.image == []){
          // this.setState({image: this.state.image.push(newUri)})
          //  } else{
            this.setState({image: newUri})
          //  }
          
        }
    } catch (error) {
      console.log("image error", error)
    }

  }

  _pickDoc = async () => {
    let result = await DocumentPicker.getDocumentAsync({type: "application/pdf"});

    

    if (!result.cancelled) {
      result['type'] = 'application/pdf'
      console.log("upload", result);
      this.setState({ doc: result.name, docUri: result});
      // alert(result.name);
    }
  };
removeDoc = ()=>{
  this.setState({doc: null})
}

removeImage = ()=>{
  this.setState({image: null})
}
feedback(response){
  console.log(response)
if (response) {
            
       
  }else{
    ShowAlert('Post','unable to add post')
  }
  
}


  submit(feedback) {
    
    
    console.log("naame", this.state.username);
    const { message, title, image, username, group, doc,docUri, feed,userType } = this.state;
    // const teacher_id = this.props.screen.TeacherId
    // const classId = this.props.navigation.getParam('id')
    // const created = new Date()
    if (message != null || image != null) {
    var splitTest = function (str) {
      return str.split('\\').pop().split('/').pop();
  }
  // console.log('filename', splitTest(image[0].uri))
    const note = {
      message: message,
      title: title,
      postId: this.props.navigation.getParam('postId'),
      username: username,
      doc: null,
      image:null,

      created: new Date()
    };
    let upload = new FormData()
    if(image != null){
    const ImageName = splitTest(image[0].uri)
    // console.log(ImageName)
    image[0]['name'] = ImageName
    const files = [
      image[0]
    ]
    upload.append('file',image[0])   }
    upload.append('message',JSON.stringify(note))  
    upload.append('doc',docUri) 
    
      this.props.onSubmit(upload,note.postId);
      let from = this.props.navigation.getParam("from")

      this.props.navigation.navigate(from)
  
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

  removeItem(data) {
    for (let i = 0; i < this.state.image.length; i++) {
      if (data.id == this.state.image[i].id) {
        this.state.image.splice(i, 1);
      }
    }
    // console.log(this.state.image);
    // this.props.removeFile(this.props.files);
  }
 
  render() {
    let navigate = this.props.navigation
    const from = this.props.navigation.getParam('from')
    
    let { image,doc } = this.state;
    // alert(image);
    const imgs =  this.state.image != null?        
                  <View style={{flexDirection:"row"}} >
                  <Image

                    source={{
                      uri: this.state.image[0].uri
                    }}
                    style={styles.img}
                  />
                  <TouchableOpacity
            onPress={() => {
              this.removeImage(idx);
            }}
            hitSlop={{
              top: 10,
              bottom: 10,
              left: 10,
              right: 10
            }}
          >
            <View style={{backgroundColor: "black", color:"white", width:20,borderRadius:100,justifyContent:"space-around", alignItems:"center"}}>
              <Text style={{ color:"white"}}>x</Text>
              </View>
            
          </TouchableOpacity>
          </View>
        
    :null
    
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
                imgs
              )
            ) : (
              null
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
      </View>:null}
    
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
              this.submit(this.feedback);
              this.props.navigation.navigate(from);
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
      alert(result.uri);
    }
  };
}

const mapPropToState = state => ({
  post: state.Posts,
  screen: state.Screen
});
const mapActionToState = {
  onSubmit: addComment
};

export default connect(mapPropToState, mapActionToState)(CreateComment);

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
    paddingLeft: 10,

  },
  attachment:{
    marginTop: 50,
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center"
  }
});

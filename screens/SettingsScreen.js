import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
  Modal,
  KeyboardAvoidingView
} from "react-native";
import * as SQLite from "expo-sqlite";
import { TextInput } from "react-native-gesture-handler";
import CacheImage from "../components/imageCache";
import {connect} from "react-redux"
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import updatePhoto, { updateAvatar } from "../actions/updatePhoto";
import TextIn from "../components/textInputs/textInput";
import ImageBrowser from "../components/ImageBrowser";
import * as Permissions from 'expo-permissions';
import Axios from "axios";
import { postBaseUrl } from "../components/requests";
import ViewImage from "../components/imageView";



const db = SQLite.openDatabase("db.db");

const { width,height } = Dimensions.get("window");
function SettingsScreen(props){

useEffect(()=>{
try {
  getPermissionAsync()
  
} catch (error) {
  console.log(error)
}
    
    },[])

  
  // const navigationOptions = { header: null }

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

//  const _pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1
//     });
//     if (!result.cancelled) {
//       setImage(result.uri);
      
//       // alert(result.uri);
//     }
//   };
  handleImages = images => {
    console.log('picked images', images);
    try {
      var splitTest = function (str) {
        return str.split('\\').pop().split('/').pop();
    }
      const ImageName = splitTest(images[0].uri)
      images[0]['name'] = ImageName
      images[0].height = 100
      images[0].width = 100
      console.log('user',props.user[0].user_id)
      const upload = new FormData()
      upload.append('file', images[0])
      props.updatePhoto(props.user[0].user_id,upload)
      setRefresh(!Refresh)
        } catch (error) {
          console.log("error", error)
        }
        

  };
   
  pickImage = async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    if (cameraRollPerm === 'granted') {
      setIsOpen( true );
    }
  };

  profilePhoto =async () => {
    let response = await fetch(`${postBaseUrl}/user/${props.user[0]['user_id']}`);
    var json = await response
    if (json.status == 200) {
      const img = await json.json()
      console.log('pp',img[0].avatar)
      setImage(img[0].avatar)
  }
 }
  const [, forceUpdate] = useState();

  useEffect( () => {
    setTimeout(forceUpdate, 2000);
    profilePhoto()
   
  });

  toggleModal = () => {
    setIsOpen( !isOpen );
  };
  
  useEffect(()=>{
    
    console.log('effect',props.user)
    // setImage(props.user[0].avatar)
  }, [])
  const [user,setUser] = useState(props.user)
  const [image,setImage] = useState(false)
  const [isOpen,setIsOpen] = useState(false)
  const [Refresh,setRefresh] = useState(false)
  const [cnp,setCnp] = useState('')
  const [newp,setNewp] = useState('')
 
  return(
    <View style={styles.container}>
      <View style={styles.content}>
     
         <View style={styles.photo}>
         {image ? (
              image && (
                <View style={styles.personDetails}>
                <TouchableOpacity style={styles.person}>
                <ViewImage

                source={{
                  uri:image
                }}
                  uri={
                     image
                  }
                  navigate={props.navigation}
                  style={styles.img}
                />
                </TouchableOpacity>
                </View>
              )
            ) : (
              <View style={styles.personDetails}>
              <TouchableOpacity style={styles.person}>
                <MaterialIcons
                  size={24}
                  name={Platform.OS === "ios" ? "person-outline" : "person-outline"}
                  style={styles.icon2}
                  color={"black"}
                />
              </TouchableOpacity>
              
            </View>
            )}

    <View>
      <TouchableOpacity onPress={pickImage} hitSlop={{
            top:10,
            left:10,
            right:10,
            bottom:10
          }}  style={styles.icon}>
            <Text style={styles.updatephoto}>
             Update Photo 
            </Text>
          </TouchableOpacity>
      </View>
        
          </View>
        

      </View>
      <View> 
        <Text style={styles.textName}>{user[0].username}</Text>
      </View>
      <View>
        <Text style={styles.textRole}>{user[0].usertype}</Text>
      </View>

      <View>
        {/* <TouchableOpacity style={styles.options} onPress={()=> setModal()}>
          <Text  style={{
            fontFamily: "Lato"}}> Change Password </Text>
           <MaterialIcons
                  size={24}
                  name={Platform.OS === "ios" ? "autorenew" : "autorenew"}
                  style={styles.icon2}
                  color={"black"}
                />
        </TouchableOpacity> */}
      </View>

      {
            <Modal
              animated={true}
              ref={ref => (this._modal = ref)}
              animationType="slide"
              transparent={true}
              visible={isOpen}
              onRequestClose={() => {}}>
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={toggleModal}
                />
                <View style={styles.modalContainer}>
                  <ImageBrowser
                    onRequestClose={toggleModal}
                    pickedImages={handleImages}
                    maxImages={1}
                  />
                </View>
              </View>
            </Modal>
          }
      </View>
  )
}

const mapPropToState = state => ({
  user: state.User
});
const mapActionToState = {
  updatePhoto: updateAvatar
};

export default connect(mapPropToState, mapActionToState)(SettingsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "Lato"
  },
  content: {
    width: width,
    justifyContent: "space-around",
    alignItems: "center"
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
    // marginLeft: 50,
    borderRadius: 100,
  },
  textName: {
    paddingLeft: 30,
    color: "#000",
    paddingTop: 5,
    fontSize: 20,
    fontFamily: "Lato",
    fontWeight: "bold"
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
    marginTop: 200,
    flexDirection:"row",
    justifyContent: "space-around"

  },
  username: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: "#ac1313",
    marginLeft: 50,
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
    paddingBottom: 10
  },personDetails: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10
  },
  person: {
    backgroundColor: "#d3d3d3",
    borderRadius: 100,
    width: 200,
    height: 200,
    justifyContent: "space-around",
    alignItems: "center"
  },
  photo:{
    padding: 10,
    justifyContent:"space-around",
    flexDirection:"row"
  },
  updatephoto:{
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 10,
    fontFamily: "Lato-Italic"


  },
  textRole: {
    paddingLeft: 30,
    color: "#000",
    paddingTop: 5,
    fontSize: 15,
    fontFamily: "Lato"
  },
  options: {
    marginTop: 20,
    width: width,
    paddingTop: 15,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: "#d3d3d3",
    justifyContent: "space-around",
    
    height: 50,
    flexDirection: "row"
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#fff',
    paddingBottom: 18,
    position: 'absolute',
    bottom: 0,
    height: height / 2,
    borderTopWidth: 0.5,
    borderTopColor: 'grey',
  },

  upload: { paddingRight: 20 },
  header: {
    shadowColor: "black",
    shadowOpacity: 0.5
  },
  MinputWrap: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 30,

    borderRadius: 15
  }
});
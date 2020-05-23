import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform
} from "react-native";
import * as SQLite from "expo-sqlite";
import { TextInput } from "react-native-gesture-handler";
import CacheImage from "../components/imageCache";

const db = SQLite.openDatabase("db.db");

const { width } = Dimensions.get("window");
export default function Settings(){

useEffect(()=>
    getPermissionAsync()
   

    // console.log("hi");
  )

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

 const _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      // alert(result.uri);
    }
  };
  
  useEffect(()=>{},[])
  const [image,setImage] = useState

  return(
    <View>
      <View> <View>
            {image ? (
              image && (
                <CacheImage
                  source={{
                    uri: image
                  }}
                  style={styles.img}
                />
              )
            ) : (
              <View></View>
            )}
          </View>
        
      <View>
      <TouchableOpacity onPress={_pickImage()} hitSlop={{
            top:10,
            left:10,
            right:10,
            bottom:10
          }}>
            <Ionicons
              size={24}
              name={Platform.OS === "ios" ? "ios-camera" : "md-camera"}
              style={styles.icon}
              color={"#2c2c2f"}
            />
          </TouchableOpacity>
      </View>
      </View>
      <View> 
        <Text>Username</Text>
      </View>
      <View>
        <Text>Role</Text>
      </View>
    </View>
  )
}

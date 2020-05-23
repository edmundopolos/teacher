
   import React from 'react';
   import {
     StyleSheet,
     Text,
     View,
     Platform,
     FlatList,
     Dimensions,
     Image,
     Animated,
     TouchableWithoutFeedback,
     TouchableOpacity,
     CameraRoll,
     Share,
     Linking
   } from 'react-native';
   
   import { Permissions} from 'expo';
   import * as FileSystem from 'expo-file-system';
   
   import axios from 'axios';
   import { Ionicons } from '@expo/vector-icons';
   const { height, width } = Dimensions.get('window');
   export default class FullImage extends React.Component {
     constructor() {
       super();
       this.state = {
         isLoading: true,
         images: [],
         scale: new Animated.Value(1),
         isImageFocused: false
       };
   
       this.scale = {
         transform: [{ scale: this.state.scale }]
       };
   
       this.actionBarY = this.state.scale.interpolate({
         inputRange: [0.9, 1],
         outputRange: [0, -80]
       });
       this.borderRadius = this.state.scale.interpolate({
         inputRange: [0.9, 1],
         outputRange: [30, 0]
       });
     }
   
     
     getPermissionAsync = async () => {
      if (Platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
      if (Platform.android) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
     };
     componentDidMount() {
       
       this.getPermissionAsync();
     }
   
     saveToCameraRoll = async image => {
      let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
      }
         FileSystem.downloadAsync(
          this.props.navigation.getParam('uri'),
           FileSystem.documentDirectory + s4()+ '.jpg'
         )
           .then(({ uri }) => {
             CameraRoll.saveToCameraRoll(uri);
             alert('Saved to photos');
           })
           .catch(error => {
             console.log(error);
           });
     
     };
   
     showControls = item => {
       this.setState(
         state => ({
           isImageFocused: !state.isImageFocused
         }),
         () => {
           if (this.state.isImageFocused) {
             Animated.spring(this.state.scale, {
               toValue: 0.9
             }).start();
           } else {
             Animated.spring(this.state.scale, {
               toValue: 1
             }).start();
           }
         }
       );
     };
   
     shareWallpaper = async image => {
       try {
         await Share.share({
           message: this.props.navigation.getParam('uri')
         });
       } catch (error) {
         console.log(error);
       }
     };
   
     renderItem = ({ item }) => {
       return (
         <View style={{ flex: 1 }}>
     
           <TouchableWithoutFeedback onPress={() => this.showControls(item)}>
             <Animated.View style={[{ height, width }, this.scale]}>
               <Animated.Image
                 style={{
                   flex: 1,
                   height: null,
                   width: null,
                   borderRadius: this.borderRadius
                 }}
                 source={{ uri: this.props.navigation.getParam('uri') }}
               />
             </Animated.View>
           </TouchableWithoutFeedback>
           <Animated.View
             style={{
               position: 'absolute',
               left: 0,
               right: 0,
               bottom: this.actionBarY,
               height: 80,
               backgroundColor: 'black',
               flexDirection: 'row',
               justifyContent: 'space-around'
             }}
           >
             
             <View
               style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
             >
               <TouchableOpacity
                 activeOpacity={0.5}
                 onPress={() => this.shareWallpaper(item)}
               >
                 <Ionicons name="ios-share" color="white" size={40} />
               </TouchableOpacity>
             </View>
             <View
               style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
             >
               <TouchableOpacity
                 activeOpacity={0.5}
                 onPress={() => this.saveToCameraRoll(item)}
               >
                 <Ionicons name="ios-save" color="white" size={40} />
               </TouchableOpacity>
             </View>
           </Animated.View>
         </View>
       );
     };
     render() {
       return (
      
         <View style={{ flex: 1, backgroundColor: 'black' }}>
           {/* <FlatList
             scrollEnabled={!this.state.isImageFocused}

             data={this.props.navigation.getParam('uri')}
             renderItem={this.renderItem}
             key={1}
           /> */}
        
             {this.renderItem(this.props.navigation.getParam('uri'))}
          
         </View>
       )
     }
   }
   
   const styles = StyleSheet.create({
     container: {
       flex: 1,
       backgroundColor: '#fff',
       alignItems: 'center',
       justifyContent: 'center'
     }
   });
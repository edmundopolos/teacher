import React from 'react';
import { StyleSheet, Text, View ,TouchableOpacity,Platform,Image,Dimensions,Modal, StatusBar } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {connect} from "react-redux"
import addFile from '../actions/addFile';
import aspliceFile from '../actions/aSliceFile';
import * as FileSystem from 'expo-file-system';
import CameraPost from '../actions/cameraPost';
import * as MediaLibrary from 'expo-media-library';
import ImageBrowser from './ImageBrowser';


const {width,height} = Dimensions.get("window")
class Cam extends React.Component {
  state = {
    hasPermission: null,
    cameraType: Camera.Constants.Type.back,
    isOpen: false,
    height: height ,
    image: null
  }

  async componentDidMount() {
    this.getPermissionAsync()
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.setState({refresh: true});
      }
    );
  }

  componentWillUnmount() {
    try {
    // this.state.scrollAnim.removeListener(this._handleScroll);
    this.willFocusSubscription.remove()
    } catch (error) {
      console.log(error)
    }
    ;
  }

  getPermissionAsync = async () => {
    // Camera roll Permission 
    if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
    // Camera Permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === 'granted' });
     // media library permission

  }
 

  handleCameraType=()=>{
    const { cameraType } = this.state

    this.setState({cameraType:
      cameraType === Camera.Constants.Type.back
      ? Camera.Constants.Type.front
      : Camera.Constants.Type.back
    })
  }

  takePicture = async () => {
    if (this.camera) {
      let {uri} = await this.camera.takePictureAsync();
      // const asset = await MediaLibrary.createAssetAsync(uri);
      console.log(uri,FileSystem.cacheDirectory)
        this.props.GetPhoto(uri)
        this.setState({image:uri})
        // FileSystem.copyAsync(uri,FileSystem.documentDirectory +'mschool')
    }
  }


  handleImages = images => {
    console.log('picked images', images);
    try {
      
      let from = this.props.navigation.getParam("from")
    // this.props.navigation.navigate(from,{image: images[0].uri})
    this.props.navigation.navigate(from,{image: images})
    } catch (error) {
      console.log("error", error)
    }
   }; 

  acceptImage = async () =>{
    const asset = await MediaLibrary.createAssetAsync(this.state.image)
    // console.log("acccept", this.state.image)
    let from = this.props.navigation.getParam("from")
    this.props.navigation.navigate(from,{image:this.state.image})
  }

  rejectImage = () => {
    this.setState({image:null})
    this.setState({refresh: true});
  }

  pickImage = async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    if (cameraRollPerm === 'granted') {
      this.setState({ isOpen: true });
    }
  };

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  
  


 update(data) {
    this.props.updateparent(data);
  }

  static navigationOptions = {header:null}

  render(){
    // console.log()
    let { image, } = this.state;
    const { isOpen } = this.state;
    const { hasPermission } = this.state
    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
          <View style={{ flex: 1 }}>
          {image ? (
              image && (
                <View style={styles.imageContainer}>
                   <StatusBar hidden={true} barStyle="dark-content" />
                <Image
        
                  source={{
                    uri: image
                  }}
                  style={styles.img}
                  />
                   <View style={{ flexDirection:"row",justifyContent:"space-around"}}>
                <TouchableOpacity
                  style={{
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'transparent'                 
                  }}
                  onPress={()=>this.rejectImage()}>
                  <FontAwesome
                      name="remove"
                      style={styles.imageAction}
                  />
                </TouchableOpacity>
              
                <TouchableOpacity
                  style={{
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                  }}
                  onPress={()=>this.acceptImage()}
                  >
                  <MaterialCommunityIcons
                      name="check"
                      style={styles.imageAction}
                  />
                </TouchableOpacity>
              </View>
                
               
               </View>
              )
            ) : (
              null
            )}
            <View style={{height: height/8, backgroundColor:"#000"}}></View>
            <Camera style={{ flex: 1 }} type={this.state.cameraType}  ref={ref => {this.camera = ref}}>
            
              <View style={{flex:1, flexDirection:"row",justifyContent:"space-between",margin:30}}>
                <TouchableOpacity
                  style={{
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'transparent'                 
                  }}
                  onPress={()=>this.pickImage()}>
                  <Ionicons
                      name={Platform.OS === "ios" ? "ios-photo" : "md-photos"}
                      style={{ color: "#fff", fontSize: 40}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                  }}
                  onPress={()=>this.takePicture()}
                  >
                  <FontAwesome
                      name="camera"
                      style={{ color: "#fff", fontSize: 40}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                  }}
                  onPress={()=>this.handleCameraType()}
                  >
                  <MaterialCommunityIcons
                      name="camera-switch"
                      style={{ color: "#fff", fontSize: 40}}
                  />
                </TouchableOpacity>
              </View>
            </Camera>
      
        
            
          
  
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
                  onPress={this.toggleModal}
                />
                <View style={styles.modalContainer}>
                  <ImageBrowser
                    onRequestClose={this.toggleModal}
                    pickedImages={this.handleImages}
                    maxImages={1}
                  />
                </View>
              </View>
            </Modal>
          }
        </View>
      );
    }
  }
  
}

const mapPropToState = state => ({
    files: state.Afiles,
    students: state.Student
  });
  const mapActionToState = {
    GetPhoto: CameraPost
  };


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    height: height,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
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
  header: {
    backgroundColor: '#f7f5eee8',
    shadowColor: '#000000',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  img: {
   
    width: width,
    height: height/1.2,
    // alignItems: "center",
    // marginLeft: 50
  },
  imageAction:{bottom: 30, color: "#26234e", fontSize: 40,margin:30}
});

export default connect(mapPropToState,mapActionToState)(Cam)
import React from "react"
import {
    View,
    StyleSheet,
    Modal,
    Text,
    Dimensions
}
from "react-native"
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props ={
  del?: Number
}

const { height, width } = Dimensions.get("window");
export default class Options extends React.Component<Props> {
  state={
      modalVisible: false
  }
  setModalVisible =() => {
      
      this.setState({modalVisible: !this.state.modalVisible})
      console.log(this.props.id)
      
  }
  makeDelete = () =>{
    this.props.del(this.props.id)
  }
  render(){

  
  return(
      <View>
          <TouchableOpacity
          onPress={()=> this.setModalVisible()}
          hitSlop={{
            top: 20,
            bottom: 20
          }}
          >
          <MaterialIcons
          name = "keyboard-arrow-down"
          size ={20}
          style={styles.iconOption}
              />

          </TouchableOpacity>
          <Modal
        animationType="slide"
        transparent={true}
        animated={true}
        opacity={0.5}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.setModalVisible();
        }}
        style={styles.Modalcontainer}
      >
        <TouchableOpacity
          onPress={() => {
            this.setState({ modalVisible: false });
          }}
          hitSlop={{
            top: 50,
            bottom: 50
          }}
        >
          <View
            style={[
              styles.Modalcontainer,
              {
                height: height/1.1
                // borderRadius: 15
              }
            ]}
          ></View>
        </TouchableOpacity>

        <View style={styles.Mcontent}>
          
          <View style={styles.menu}>
            <View style={styles.inputWrap}>
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible();
                }}
              >
             <TouchableOpacity 
            onPress={()=> {this.setModalVisible(); this.makeDelete()}}
            >
                <Text>Delete</Text>
            </TouchableOpacity>
             
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    
      </View>
  )
  }
}
const styles = StyleSheet.create({
  Options:{
    justifyContent:"flex-end",
    padding:5
  },
  top:{
    justifyContent:"space-between",
    flexDirection:"row"
  },
  Modalcontainer: { backgroundColor: "#000", opacity: 0.5 },
  Mcontent: {
    // width: width,
    bottom:50,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // height: height-50
  },
  modal: { backgroundColor: "#000", opacity: 0.5 },

  upload: { paddingRight: 20 },
  header: {
    shadowColor: "black",
    shadowOpacity: 0.5
  },
  inputWrap: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 34,

    borderRadius: 15
  },
  
  iconOption: {
 padding:10,
 marginTop:20
  },
  icon: {
//  padding:10,
//  marginTop:20
  },
  option: { color: "#26234e" }
});

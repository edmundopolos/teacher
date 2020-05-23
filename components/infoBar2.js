import React,{useState} from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
  Dimensions,
  Modal
} from "react-native";
// import Options from "./options";


type Props ={
  del?: Number
}


const {width,height} = Dimensions.get("window")

export default function Infobar2(props) {
  const color = props.color;
  return (
    <TouchableOpacity
      {...props}
   
      style={styles.container}
    >
      <View style={{ flexDirection: "row",marginTop: 10 }}>
        <Ionicons
          size={26}
          name={
            Platform.OS === "ios" ? "ios-" + props.name : "md-" + props.name
          }
          color={props.color}
        />
        <Text style={styles.text}>{props.title}</Text>
        
      </View>
      <View style={styles.option} >{props.del?<Options del={props.del} id={props.id}/>:null}</View>
    </TouchableOpacity>
  );
}

export function Options (props) {


  const [modalVisible,setModalVisible]=useState(false)
 
  makeDelete = () =>{
    props.del(props.id)
  }
 

  
  return(
      <View>
          <TouchableOpacity
          onPress={()=> setModalVisible(!modalVisible)}
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
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        style={styles.Modalcontainer}
      >
        <TouchableOpacity
          onPress={() => {
            setModalVisible(!modalVisible);
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
                  setModalVisible(!modalVisible);
                }}
              >
             <TouchableOpacity 
            onPress={()=> {setModalVisible(!modalVisible); makeDelete()}}
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


const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor:"#fff",
    justifyContent:"space-between",
    borderRadius: 15,
    elevation: 1,
    width: width-20,
    flexDirection:"row"
  },

  text: {
    fontFamily:"Lato",
    fontSize: 20,
    fontWeight: "400",
    paddingLeft: 20,
    color: "#000"
  },
  icon: {
    color: "green",
    position: "absolute",
    top: 8,
    paddingRight: 15
  },
  option:{

    justifyContent:"flex-end",
    color: "#26234e"
  },
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

});

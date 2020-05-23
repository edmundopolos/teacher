import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
  Modal
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {connect} from "react-redux"
import likePost from "../actions/likePost";
import ViewImage from "./imageView";
import * as FileSystem from 'expo-file-system';
// import Options from "./options";

const { width, height } = Dimensions.get("window");
type Props ={
  del?: Number
}
class PostDetail extends React.Component<Props> {
  state = {
    id : this.props.id,
    refresh: false
  }

  componentDidMount() {
    this.timer = setInterval(() => {

    this.setState({ refresh: !this.state.refresh });
    }, 1000);

  }
  componentWillUnmount() {
    try {
     clearInterval(this.timer);
 
    } catch (error) {
      console.log(error)
    }

  }
  
  callback = downloadProgress => {
    const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
    this.setState({
      downloadProgress: progress,
    });
  };
  
 downloadResumable = (uri) => { 
   FileSystem.downloadAsync(
    uri,
    FileSystem.documentDirectory,
    {},
    this.callback
  );
  }
  render(){
  month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  day = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  // console.log(this.props.navigate.getParam('user')) 

  return (
    <View style={styles.container}>
      <View style={styles.content} key={this.props.post.id}>
        <View style={styles.top}>
        <View style={styles.personDetails}>
          <TouchableOpacity style={styles.person}>
            <MaterialIcons
              size={24}
              name={Platform.OS === "ios" ? "person-outline" : "person-outline"}
              style={styles.icon}
              color={"black"}
            />
          </TouchableOpacity>
          <View style={styles.name}>
            <Text>{this.props.post.username}</Text>
            <Text style={styles.date}>
              {new Date(this.props.post.created).getDate()}
              {"  "}
              {day[new Date(this.props.post.created).getDay()]} {"  "}
              {month[new Date(this.props.post.created).getMonth()]}
              {"  "}
              {month[new Date(this.props.post.created).getFullYear()]}
              {"  "}
              {new Date(this.props.post.created).getHours()}: {new Date(this.props.post.created).getMinutes()}
            </Text>
          </View>
        </View>
        <View style={styles.option}>{this.props.del?<Options navigate={this.props.navigate} id={this.props.id} message={this.props.post} del={this.props.del}/>:null}</View>
        </View>
        {this.props.post.message ? (
          <View>
           
            <View style={styles.text}>
              <Text>{this.props.post.message}</Text>
            </View>
          </View>
        ) : (
          null
        )}
        {this.props.post.image ? (
          <ViewImage  navigate={this.props.navigate} uri = {this.props.post.image}  style={styles.image} />
        ) : (
          null
        )}
        {this.props.post.doc != null? 
        <View style={{width:width,justifyContent:"space-around",alignItems:"center"}}>
      <View  style={styles.attachment}>
        <TouchableOpacity
          onPress={() => 
            FileSystem.downloadAsync(
              this.props.post.doc.uri,
              FileSystem.documentDirectory+'/'+this.props.post.doc.name,
            ) .then(({ uri }) => {
              console.log('Finished downloading to ', uri);
            })
            .catch(error => {
              console.error(error);
            })

          }
          hitSlop={{
            top: 10,
            bottom: 10,
            left: 10,
            right: 10
          }}
        > 
         <Text style={{fontSize:15,paddingLeft:10 }}> {this.props.post.doc.name} </Text>
      
          
        </TouchableOpacity>
      </View>
      </View>
      :null}
    
        
       
      </View>
    </View>
  );
  }
}

class Options extends React.Component<Props> {
  state={
      modalVisible: false
  }
  setModalVisible =() => {
      
      this.setState({modalVisible: !this.state.modalVisible})
      console.log(this.props.id)
      
  }
  makeDelete = () =>{
    this.props.del(this.props.id,this.props.message)
    // console.log("comment",this.props.message)
    this.props.navigate.goBack()
  }
  render(){

  
  return(
      <View>
          <TouchableOpacity
          onPress={()=> this.setModalVisible()}
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
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    marginBottom: 20,
    width: width,
    alignItems: "center",
    backgroundColor:"#ececec",

    marginTop:10
 
  },
  content: {
   
    flexDirection: "column",
    justifyContent:"space-around",
    backgroundColor:"#fff",
    width: "100%",
    borderColor:"#26234e",
    borderWidth:1,
    borderRadius:15,
    borderWidth:0.1
  },
  image: {

    height: 150,
    width: width ,
    borderRadius: 15,
    paddingBottom: 10,
    borderColor:"#ececec",
    borderWidth:1
  },
  text: {
    paddingLeft:20,
    paddingRight:20,
    paddingBottom:20,
    fontFamily:"Roboto"
  },
  relate: {
    paddingTop:10,
    paddingBottom:10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  person: {
    backgroundColor: "#d3d3d3",
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: "space-around",
    alignItems: "center"
  },
  personDetails: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10
  },
  name: {
    paddingLeft: 5
  },
  date: {
    paddingLeft: 5,
    fontSize:10,
    fontFamily:"Lato"
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
    bottom: 50,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: height/5
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
 padding:5,
 marginTop:10
  },
  icon: {
//  padding:10,
//  marginTop:20
  },
  option: { color: "#26234e" },
  attachment:{
    marginTop: 20,
    marginBottom: 20,
    width:width,
    flexDirection:"column",
    justifyContent:"space-around",
    alignItems:"center",
    width: 300, 
    fontSize:15, 
    borderRadius:15, 
    backgroundColor:"grey", 
    opacity:0.5
  }
});

mapActionToProp = {
  like : likePost
}

export default connect(null,mapActionToProp) (PostDetail)
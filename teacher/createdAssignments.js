import React, {useState, useEffect} from 'react'
import {ScrollView,View,Text,TouchableOpacity, StyleSheet, Dimensions} from 'react-native'
import { connect } from "react-redux";
import Axios from 'axios';
import * as WebBrowser from 'expo-web-browser';
import { postBaseUrl } from '../components/requests';
const {width,height} = Dimensions.get('window')



function ClassAssignments(props) {
  const classId = props.navigate.getParam("class")
console.log('prop ',props.navigate.getParam("class"))
const getUrl = (cid) => `http://192.168.43.136:5000/assignment/class/${cid}`;
// const navigationOptions = {header: null}
    const [assignments, setAssignments] = useState([]) 
   useEffect(()=>{ 
    Axios.get(getUrl(classId.Id))
    .then(res=> setAssignments(res.data))
    .catch(err=>console.log(err)) 
    
   },[]) 
// const data = props.navigation.getParam("data")


      console.log('asssssss',assignments)
      const student = assignments.map(data => (
        <TouchableOpacity key={data._id} style={styles.tab}>
          <View style={styles.innerContainer}>
            <View style={styles.infotitle}>
              <Text style={styles.title}>Title: {data.title}</Text>
            </View>
            <View>
            <TouchableOpacity onPress={ async ()=> await WebBrowser.openBrowserAsync(`${postBaseUrl}:8081/create_assignment?aid=${data._id}&title=${data.title}&cid=${data.classId}`)}>{data.form.length == 0?<Text style={styles.title}>Create Assignment</Text>:<Text style={styles.title}>View Assignment</Text>}</TouchableOpacity>
            </View>
            <View style={styles.infomessage}>
            {data.files ?  <Text style={styles.message}>File: {data.files.map(dt=>
                <Text  key={dt.id}>{dt.name}</Text>
                )}</Text>:null}
                <Text style={styles.message}>Due:  {data.duedate} </Text>
            </View>
          </View>
        </TouchableOpacity>
      ));
    //   console.log(student)
      return (
        <View style={styles.container}>
          {/* <ClassHeader ward={this.props.student} name={data.name} /> */}
          <ScrollView
            style={styles.scroll}
            scrollEventThrottle={16}
          
          >
            <View style={styles.content}>{student}</View>
          </ScrollView>
        </View>
      );
    
}

const mapStateToProps = state => ({
  allAssignments : state.Assignments
})

export default connect(mapStateToProps)(ClassAssignments)

const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: height
    },
    content: {
      marginBottom: 10,
      justifyContent: "space-around",
      alignItems: "center",
      minHeight: 300
    },
    tab: {
      width: 300,
      height: 160,
      borderRadius: 15,
      backgroundColor: "#26234e",
      // marginBottom: 10,
      marginTop: 10,
      elevation: 10
    },
    innerContainer: {
      marginTop: 5,
      width: 300,
      height: 150,
      borderRadius: 15,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "space-around"
    },
    infotitle: {
      padding: 15
    },
    infomessage: {
      padding: 15
    },
    infonumber: {
      padding: 15
    },
    title: {
      fontSize: 20,
      color: "#26234e"
    },
    number: {
      fontSize: 10
    },
    message: {
      fontSize: 15,
      color: "#26234e"
    },
    scroll: {
      flex: 1,
  
      paddingBottom: 20
    }
  });
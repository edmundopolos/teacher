import React, {useState, useEffect} from 'react'
import {ScrollView,View,Text,TouchableOpacity, StyleSheet, Dimensions} from 'react-native'
import * as SQLite from "expo-sqlite";
import getAssigment from '../reducers/getAssigment';
import { connect } from "react-redux";


const db = SQLite.openDatabase("db.db");
const {width,height} = Dimensions.get('window')



function GetAllQuiz(props) {

const navigationOptions = {header: null}
    const [quiz, setQuiz] = useState([]) 
   useEffect(()=>{    

},[]) 
  // console.log('arrrry',quiz) 

    const data = props.navigation.getParam("data")
           
   
      // console.log('asssssss',Quiz)
      const student = props.quiz.map(data => (
        <TouchableOpacity key={data._id} style={styles.tab}>
          <View style={styles.innerContainer}>
            <View style={styles.infotitle}>
              <Text style={styles.title}>Title: {data.title}</Text>
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
  quiz : state.Quiz
})

export default connect(mapStateToProps)(GetAllQuiz)

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
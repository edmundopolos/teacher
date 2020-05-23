import React from 'react';
import {StyleSheet,View,Text,TouchableOpacity} from 'react-native';




export default function ViewAssignment(props){
    const data = props.navigation.getParam("Asg")
    const details = data.map((data,idx) => (
        <View key={idx} style={styles.container}>
      
          <View style={styles.innerContainer}>
          <View style={styles.infotitle}>
              <Text style={styles.title}>{data.wardName}</Text>
            </View>
           
            <View style={styles.infomessage}>
              <Text style={styles.message}>{data.title}</Text>
            </View>
            <View style={styles.infomessage}>
              <Text style={styles.message}>{data.due}</Text>
            </View>
          </View>
        
        </View>
        
      ))
return (
    <View style={styles.content}>{details}</View>
    

)
}
const styles = StyleSheet.create({
    content: {
        marginTop: 20,
        justifyContent: "space-around",
        alignItems: "center"
      },
    container: {
        width: 300,
        height: 160,
        borderRadius: 15,
        backgroundColor: "#26234e",
        marginBottom: 10,
        elevation: 10,
        marginTop: 10
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
    }
  });
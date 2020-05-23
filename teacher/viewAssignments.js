import React, { Component,useEffect,useState } from 'react'
import {View,Text,ScrollView, StyleSheet, TouchableWithoutFeedback  } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Assignment from './forms/assignment';
import ClassAssignment from './createdAssignments'




export default function viewAssignments(props)  {
    useEffect(() => {
        
        return () => {
          
        }
    }, [])
    const [Create, setCreate] = useState(true)
    // const [Assignments, setAssignments] = useState(False)
    const [Active, setActive] = useState(true)
    const active = {color:"#26234e", borderBottomWidth: 1,borderBottomColor:"#26234e",fontSize:15 }
    console.log(Active,Create)
    return (
        <ScrollView>
            <View style={{flexDirection:"row",justifyContent:"space-around",alignItems:"center",marginTop:10}}>
            
            <TouchableOpacity onPress={()=>{
                setCreate(true);
                setActive(true);}}>
                    <Text style={Active?active:{color:"#26234e",fontSize:10, }}>Create Assignment</Text>
                    </TouchableOpacity>
         <TouchableOpacity onPress={()=>{
             setCreate(false);
             setActive(false);}}>
             <Text style={!Active?active:{color:"#26234e",fontSize:10}}>View Assignments</Text>
             </TouchableOpacity>
            </View>
            <View>
                {Create?
                <Assignment/>:
                <ClassAssignment navigate={props.navigation}/>
            }
            </View>
        </ScrollView>
    )
}

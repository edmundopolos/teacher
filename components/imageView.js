import React from 'react';
import {
   Image,
    StyleSheet,
    TouchableOpacity,
    View,
    
  } from "react-native";




 export default function ViewImage(props){
    //  console.log(props)
     return (
         <TouchableOpacity activeOpacity={0.8} onPress={ ()=> props.navigate.navigate("Full",{uri: props.uri})}>
    <Image
    style={{borderColor:"#000",borderWidth:15}}
    source={{uri:props.uri}}
    {...props}
    />
</TouchableOpacity>
     )

 }
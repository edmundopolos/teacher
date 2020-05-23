import React, { Component } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { View,Image, TouchableOpacity, Platform, KeyboardAvoidingView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import * as SQLite from "expo-sqlite";
import { Notifications } from 'expo'
import { post, postBaseUrl } from "../components/requests";
import PushNotifications from "../components/pushNotification";
import {connect} from 'react-redux'
import Axios from "axios";

import updateMessages, { getOne } from "../actions/messageActions";
import Header from "../components/header";



const push = new PushNotifications();

const db = SQLite.openDatabase("db.db");
class ChatPage extends Component {
  state = {
    messages: [],
    token: ''
  };

  

async componentDidMount() {
  const resId =this.props.navigation.getParam('id')
  const myId = this.props.navigation.getParam('user')
  this.timer = setInterval(() => {
    
  }, 10000);
    // this.currentUser = await firebase.auth().currentUser;
    push.registerForPushNotificationsAsync();
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
      this.getMessages()
      }
    );
  
  }
  componentWillUnmount() {
    try {
    //  clearInterval(this.timer);

        this.willFocusSubscription.remove();
    } catch (error) {
      console.log(error)
    }
   
  }


  componentWillMount() {
  this.getMessages()
  }

  getMessages = async () => {
    const resId =this.props.navigation.getParam('id')
    const myId = this.props.navigation.getParam('user')
    let response = await fetch(`${postBaseUrl}/message/user/${myId.user_id}/${resId}`);
    var json = await response
    // 
    if(json.status == 200){
      const data =await json.json()
      const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      console.log('name',sortedData)
       this.setState({
      messages: data
    })
    }
   
  }

  setRefreshing() {
    // this.setState({ refreshing: !this.state.refreshing });

    // setTimeout(this.setState({ refreshing: !this.state.refreshing }), 1000);
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
    const idx = messages.length - 1
    const data = {
      user:messages[idx].user,
      text:messages[idx].text,
      user_id:messages[idx].user.id,
      recepient: this.props.navigation.getParam('id'),
      read:"false",
      token: push.getToken(),
      createdAt: new Date()
    }
    // console.log('jhgvfkut',messages[idx].text)
    Axios.post(`${postBaseUrl}/message/`,data,{ headers: {'Content-Type': 'application/json'}})
    .then(function (response) {
      // console.log('post',response.data);
      if (response.status == 201 ) {
        
        push.sendPushNotification('New message', messages[idx].text )
      }
       
    })
    .catch(function (error) {
      console.log(error);
    });


  
    
  }

  static navigationOptions ={header: null}



  render() {
    name = this.props.navigation.getParam("user")
    rec = this.props.navigation.getParam("name")
    
    return (

      <View style={{ flex: 1}}>
        <Header name={rec}/>
        <GiftedChat
        messages={this.state.messages}

        isTyping={true}
        onSend={messages => this.onSend(messages)}
        textInputProps={{borderRadius: 15}}
       
        user={{
          _id: name.user_id,
          name: name.username
        }}
      />
      {
      Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
   }
   
      </View>
      
    );
  }
}

mapPropToState = state =>({

  messages: state.Messages
})

mapActionToState ={
  updateMessages : getOne
}


export default connect(mapPropToState,mapActionToState) (ChatPage);

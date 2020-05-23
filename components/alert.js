import React from 'react';
import {View,Alert} from 'react-native';




function ShowAlert(title,msg) {
    
 Alert.alert(
       title,
        msg,
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      );

    
   
}

function ShowAlertOptions(title,msg,option1,option2){
    Alert.alert(
        title,
        msg,
        [
          { text: 'Ask me later', onPress: () => option1 },
          {
            text: 'Cancel',
            onPress: () => option2,
            style: 'cancel',
          },
        //   { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      );
}

export {ShowAlert,ShowAlertOptions}
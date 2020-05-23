import * as SQLite from "expo-sqlite";
import { Notifications } from 'expo'
const db = SQLite.openDatabase("db.db");
import * as Permissions from "expo-permissions";
import { post } from "./requests";
import Axios from "axios";



export default class PushNotifications{
    token;

    registerForPushNotificationsAsync = async () => {
        const { status: existingStatus } = await Permissions.getAsync(
          Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;
    
        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
          // Android remote notification permissions are granted during the app
          // install, so this will only ask on iOS
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          finalStatus = status;
        }
    
        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
          return;
        }
    
        try {
          // Get the token that uniquely identifies this device
          this.token = await Notifications.getExpoPushTokenAsync();
          // console.log('token',this.token)
          db.exec(
            [ {
             sql: "select token from user",
             args: []
             }
           ],
           false,
           (tx,result) => {
            //  console.log('push',result[0].rows)
             if(result[0].rows.length > 0){
               if(result[0].rows[0].token != this.token){
                   db.exec(
            [
              {
                sql: "update user set token = ?;",
                args: [this.token]
              }
            ],
            false,
            (tx, result) => {
                // console.log(result[0].rows)
               
                    // console.log(this.token)
                  
                })
               }
             }
           }
           )
        

        } catch (error) {
          console.log(error);
        }
      };

      getToken = () => {
        // 
      return this.token
      }

      sendPushNotification = (title,body) => {
        // console.log('token',this.token)
        let res = post('https://exp.host/--/api/v2/push/send',JSON.stringify({
          to: this.token,
          sound: 'default',
          title: title,
          body:  body
        }))
        // .then(res => {})
        
      };
}
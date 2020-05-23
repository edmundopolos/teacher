import React from "react";
import {
  Modal,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  DatePickerAndroid,
  TimePickerAndroid,
  Dimensions,
  RefreshControl,
  Alert,
} from "react-native";
import TextIn from "../../components/textInputs/textInput";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { connect } from "react-redux";
import addFile from "../../actions/addFile";
import aspliceFile from "../../actions/aSliceFile";
import * as SQLite from "expo-sqlite";
import { Notifications } from 'expo'
import { post, postBaseUrl } from "../../components/requests";
import PushNotifications from "../../components/pushNotification";
import { ShowAlert } from "../../components/alert";
import { NavigationEvents } from "react-navigation";
import updateAssignment from "../../actions/updateAssignments";
import Axios from "axios";

const db = SQLite.openDatabase("db.db");
const { width, height } = Dimensions.get("window");
const push = new PushNotifications;

class Assignment extends React.Component {
  state = {
    DueDate: "",
    Time: "",
    Title: "",
    Guide: "",
    modalVisible: false,
    classId: '',
    refresh: false,
    attachments: this.props.files,
    token: "",
    created: new Date()
  };
  update(data) {
    this.props.updateparent(data);
  }

  

  async componentDidMount() {
    // this.currentUser = await firebase.auth().currentUser;
    try{
      timer = setInterval(() => {
   this.setRefreshing()
    }, 5000);
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.setState({refresh:!this.state.refresh})
      })
   
    } catch{
      console.log("couldn't unmount")
    }

  // console.log('class', this.props)

  push.getToken()
  };



  componentWillUnmount() {
    clearInterval(timer);
  }
  feedback(response){
    console.log(response)
 
    
  }

  submit(feedback) {
    const { Title, DueDate, Class, Guide } = this.state;
    const class_id =  this.props.navigation.getParam("class")
    // console.log('class',class_id)
    if (Title,DueDate) {
       const d = new Date();

    // const created = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDay();
     let {attachments,DueDate,Guide,Title,created,classId} = this.state
      let data = {
        duedate: DueDate,
        
        guide: Guide,
        title:Title,
        created:created,
        classId:class_id.Id,
        groupId: ''
      }
      const upload = new FormData();
      upload.append('doc', attachments)
      upload.append('message',JSON.stringify(data))
      Axios.post(`${postBaseUrl}/assignment/`, upload,{
        headers: {'Content-Type': 'application/json'}})
      .then(function (response) {
        // console.log('post',response.data);
        if (response.status == 201 ) {

            push.sendPushNotification('New Assignment')
                   
                     ShowAlert('Assignment','Created successfully')
       
         
    
         updateAssignment(response.data)
        }
         
      })
      .catch(function (error) {
        console.log(error);
      });
 this.setState({
                      attachments: [],
                      DueDate: "",
                      Time: "",
                      Guide: "",
                      Title: "",
                      displayDate: ""
                    });
   
  }
  }
  setRefreshing() {
    this.setState({ refreshing: !this.state.refreshing });
    // setTimeout(this.setState({ refreshing: !this.state.refreshing }), 1000);
  }

  wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }
  onRefresh = () => {
    this.setRefreshing();

    this.wait(1000).then(() => this.setRefreshing());
  };

  setModalVisible() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  removeItem(data) {
    for (let i = 0; i < this.props.files.length; i++) {
      if (data.id == this.props.files[i].id) {
        this.props.files.splice(i, 1);
      }
    }
    console.log(this.props.files);
    this.props.removeFile(this.props.files);
  }

  static navigationOptions = { header: null };
  render() {
 
    const attachments = this.state.attachments.map(item => (
      <View key={item.id} style={styles.attachment}>
        <Text style={{ width: 200 }}> {item.name} </Text>
        <TouchableOpacity
          onPress={() => {
            this.removeItem(item);
          }}
          hitSlop={{
            top: 10,
            bottom: 10,
            left: 10,
            right: 10
          }}
        >
          <Text>x</Text>
        </TouchableOpacity>
      </View>
    ));
    // console.log(this.props.navigation.getParam("class"));
    return (
      <View>
        <NavigationEvents
        onDidFocus={() =>{
          this.setState({refresh: true}
         );
      }}
        />
        <ScrollView
          style={styles.content}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          <View style={styles.container}>
            <View>
              <TouchableOpacity style={styles.picker} onPress={this.datepicker}>
                <Text  style={{
                  fontFamily: "Lato"}}> Date Due </Text>
                <Text style={{
                  fontFamily: "Lato"}}>{this.state.displayDate}</Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                style={styles.picker}
                onPress={this.openTimePicker}
              >
                <Text style={{
                  fontFamily: "Lato"}}> Time Picker </Text>
                <Text style={{
                  fontFamily: "Lato"}}>{this.state.Time}</Text>
              </TouchableOpacity>
            </View>
            <TextIn
              android="book"
              iso="book"
              focused="false"
              placeholder="Title"
              placeholderTextColor="black"
              onChangeText={text => this.setState({ Title: text })}
              underlineColorAndroid="transparent"
              autoCapitalize={"sentences"}
              style={{ backgroundColor: "white", height: 10 
                ,fontFamily: "Lato" }}
            />

            <TextIn
              android="book"
              iso="book"
              focused="false"
              placeholder="Guide"
              multiline={true}
              numberOfLines={7}
              placeholderTextColor="black"
              onChangeText={text => this.setState({ Guide: text })}
              underlineColorAndroid="transparent"
              autoCapitalize={"sentences"}
              style={{ backgroundColor: "white", height: 10,
                fontFamily: "Lato"}} 
            />

            <View>
              {attachments}

              <TouchableOpacity
                style={styles.attachment}
                onPress={() => {
                  this.setModalVisible();
                }}
              >
                <Text  style={{
                  fontFamily: "Lato"}}> Attach Document </Text>
                <Text></Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputWrap}>
              <TouchableOpacity
                title={"submit"}
                color={"rgba(214, 182, 0, 1)"}
                onPress={() => {
                  this.submit(this.feedback);
                }}
              >
                <Text  style={{
                  fontFamily: "Lato"}}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <View style={styles.Mcontainer}>
          <Modal
            animationType="slide"
            transparent={true}
            animated={true}
            opacity={0.5}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.props.rrender();
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
                    height: 500
                    // borderRadius: 15
                  }
                ]}
              ></View>
            </TouchableOpacity>

            <View style={styles.Mcontent}>
              <View style={styles.Mmenu}>
                <View style={styles.inputWrap}>
                  <TouchableOpacity
                    style={styles.attachmentOptions}
                    onPress={() => {
                      this.setModalVisible();
                      this._pickDoc();
                    }}
                  >
                    <Text> Upload File </Text>
                    <Text></Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.attachmentOptions}
                    onPress={() => {
                      this.setModalVisible();
                      this.props.navigation.navigate("Folders");
                    }}
                  >
                    <Text> From Folder </Text>
                    <Text></Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.attachmentOptions}
                    onPress={() => {
                      this.setModalVisible();
                    }}
                  >
                    <Text> Link </Text>
                    <Text></Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
  date(day, month, year) {
    months = [
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
    days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

    this.setState({
      DueDate: year + "-" + month + "-" + day,
      displayDate: day + "-" + months[month] + "-" + year
    });
  }
  time(hour, minute) {
    this.setState({ Time: hour + ":" + minute });
  }
  datepicker = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        // date: new Date(2020, 4, 25),
        day: "20",
        month: "4",
        year: "2029"
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // alert(year, month, day);
        // // Selected year, month (0-11), day
        // console.log(year);
        // console.log(month);
        // console.log(day);
        this.date(day, month, year);
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  };

  openTimePicker = async () => {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: 14,
        minute: 15,
        is24Hour: true, // Will display '2 PM'
        interval: 15
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        // Selected hour (0-23), minute (0-59)// Selected year, month (0-11), day
        // console.log(hour);
        // console.log(minute);
        this.time(hour, minute);
      }
    } catch ({ code, message }) {
      console.warn("Cannot open time picker", message);
    }
  };

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    // console.log("upload", result);

    if (!result.cancelled) {
      const { folder } = this.state;
      result["folder"] = folder;
      result["screen"] = this.props.screen;
      this.props.update(result);
    }
  };
// {type:'application/*'}
  _pickDoc = async () => {
    let result = await DocumentPicker.getDocumentAsync();
    const mime = {
      jpg:'image/jpg',
      png: 'image/png',
      pdf: 'application/pdf',
      docx: 'application/docx'
    }
    // console.log("upload", result);

    if (!result.cancelled) {
      const { folder } = this.state;
      var splitTest = function (str) {
        return str.split('\\').pop().split('/').pop().split('.').pop();
    }
    const type = mime[splitTest(result.name)]
      result['type'] = type

      this.props.update(result);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: StatusBar.height,
    backgroundColor: "#fff",
    justifyContent: "space-around",
    alignItems: "center",
    height: height - 50
  },
  picker: {
    width: width,

    borderBottomWidth: 0.5,
    borderColor: "#d3d3d3",
    justifyContent: "space-around",
    alignItems: "flex-start",
    height: 40,
    flexDirection: "row"
  },
  attachmentOptions: {
    width: width,
    marginTop: 10,
    paddingTop: 5,
    borderBottomWidth: 0.5,
    borderColor: "#d3d3d3",
    justifyContent: "space-around",
    alignItems: "flex-start",
    height: 50,
    flexDirection: "row"
  },
  Mcontainer: { flex: 1 },
  attachment: {
    marginTop: 15,
    width: width,
    borderWidth: 0.5,
    borderColor: "#d3d3d3",
    justifyContent: "space-around",
    alignItems: "center",
    height: 50,
    flexDirection: "row"
  },
  Modalcontainer: { backgroundColor: "#000", opacity: 0.5 },
  Mcontent: {
    // width: width,
    top: -200,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: height- 30
  },
  Mmodal: { backgroundColor: "#000", opacity: 0.5 },

  upload: { paddingRight: 20 },
  header: {
    shadowColor: "black",
    shadowOpacity: 0.5
  },
  MinputWrap: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 30,

    borderRadius: 15
  }
});

const mapPropToState = state => ({
  files: state.Afiles,
  students: state.Student
});
const mapActionToState = {
  update: addFile,
  removeFile: aspliceFile,

};

export default connect(mapPropToState, mapActionToState)(Assignment);

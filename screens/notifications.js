import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Picker,
  Modal
} from "react-native";
import {connect} from "react-redux";


const notifications = [
  {
    id: 1,
    title: "Prom",
    date: "20-02-2020",
    message: "this is to inform you that prom date is set to 2 weeks from today"
  },
  {
    id: 2,
    title: "SS2 Drama",
    date: "19-02-2020",
    message: "The ss2 drama will hold at the school's auditorium"
  }
];
class Notifications extends React.Component {
  state = {
    data: ['News','Assignment'],
    display: '',
    Classes: this.props.students,
    parentId: this.props.parent.id,
    Assignments: [],
    modalVisible: false,
    Asgn: []
  };

  componentDidMount(){
    this.wardData()
  }

  static navigationOptions = {header: null}
wardData = () =>{
  console.log('assgn',this.props.Assignments)
    var ward = [];
    let asgn = []
    let i;
    for (i = 0; i < this.state.Classes.length; i++) {
      if (this.state.parentId == this.state.Classes[i].parentId) {
        ward.push(this.state.Classes[i]);
      }
      // console.log("data", ward);s
    }

    for (const i of ward) {
      let b = []
      let c = []
      let a
      for (const k of i.class) {
        for (const j of this.props.Assignments) {
          if (k == j.classId) {
            b.push(i.name)
            c.push({
                wardName: i.name,
              title: j.title,
              due: j.duedate,
            })
            a = b.length
            asgn.push({
              id: Math.floor(Math.random() * 100),
              wardName: i.name,
              asg:c ,
            total: a
            // 
            });
            
          }
        }
      }
    }
    this.setState({Assignments: asgn})
}


  render() {
    console.log('asdgn', this.state.Assignments)
    const data = this.state.data.map((item,idx)=> <Picker.Item key={idx} label={item} value={item} />)
    const feed = notifications.map(data => (
            <TouchableOpacity key={data.id} style={styles.container}>
              <View style={styles.innerContainer}>
                <View style={styles.infotitle}>
                  <Text style={styles.title}>{data.title}</Text>
                </View>
                <View style={styles.infomessage}>
                  <Text style={styles.message}>{data.message}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
    const Asgn = this.state.Assignments.map(data => (
      <TouchableOpacity key={data.id} style={styles.container}
      onPress = { () =>{
        
        this.props.navigation.navigate("View",{Asg:data.asg})
        // console.log('justd',data)
      }}
      >
        <View style={styles.innerContainer}>
        <View style={styles.infotitle}>
            <Text style={styles.title}>{data.wardName}</Text>
          </View>
         
          <View style={styles.infomessage}>
            <Text style={styles.message}>{data.total}</Text>
          </View>
        </View>
      </TouchableOpacity>
    ))
    
    return (
      <ScrollView>
        <View style={styles.content}>
        <Picker
        selectedValue={this.state.display}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => this.setState({ display: itemValue })}>
        {data}
        
        </Picker>
          {this.state.display == 'Assignment'?<ScrollView>{Asgn}</ScrollView> :this.state.display == 'News'?<ScrollView>{feed}</ScrollView> :<ScrollView>{feed}</ScrollView> }
          

        </View>
      </ScrollView>
    );
  }
}


const mapPropToState = state => ({
 Classes: state.Classes,
  students: state.Student,
  parent: state.Parent,
  Assignments: state.Assignments
});

export default connect(mapPropToState )(Notifications)



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

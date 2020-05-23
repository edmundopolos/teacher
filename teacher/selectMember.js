import React, { Component } from "react";
import { View, TouchableOpacity, Text, StatusBar } from "react-native";
import MultiSelect from "react-native-multiple-select";
import { connect } from "react-redux";
import updateStudent from "../actions/studentActions";
import {get, add} from "../actions/addStudent";
import { ScrollView } from "react-native-gesture-handler";

class SelectMember extends Component {
  state = {
    selectedItems: [],
    members: []
  };
 

  onSelectedItemsChange = selectedItems => {
    this.setState({
      selectedItems
    });
  };

  groupMember() {
    var list
    var len = this.state.selectedItems;
    // console.log('len',this.props.group)
    var prop = this.props.students;
    var i, k;

    for (k = 0; k < len.length; k++) {
      for (let l = 0; l < this.props.students.length; l++) {
       if (len[k]== this.props.students[l]['Id']){
          list ={
        name: this.props.students[l].name,
        studentId: len[k],
        classId: this.props.students[l].class[0].Id,
        purpose: '',
        groupId: this.props.group._id
      }
     
     
      this.props.onsubmit(list);
    
    //  console.log('list of selected',list);
       }
        
      }
     
      
    }
    
    // 
  }

  render() {
    const { selectedItems } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          hidden={false}
          backgroundColor="white"
          // translucent={true}
          barStyle="light-content"
        />
        <ScrollView>
          <MultiSelect
            hideTags
            items={this.props.students}
            uniqueKey="Id"
            ref={component => {
              this.multiSelect = component;
            }}
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={selectedItems}
            selectText="Pick Items"
            searchInputPlaceholderText="Search students..."
            onChangeInput={text => console.log(text)}
            // altFontFamily="ProximaNova-Light"
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            displayKey="name"
            hideSubmitButton={true}
            searchInputStyle={{ color: "#CCC" }}
            submitButtonColor="#CCC"
            submitButtonText="Submit"
          />

          <View
            style={{
              flex: 1,
              justifyContent: "space-around",
              alignItems: "center"
            }}
          >
            <View>
              {this.multiSelect &&
                this.multiSelect.getSelectedItemsExt(selectedItems)}
            </View>
            <TouchableOpacity
              onPress={() => {
                this.groupMember();
                this.props.navigation.navigate("Member");
              }}
              style={{
                width: 60,
                margin: 15,
                borderRadius: 15,
                borderWidth: 0.5,
                justifyContent: "space-around",
                alignItems: "center"
              }}
            >
              <Text>Add</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapPropToState = state => ({
  students: state.Student,
  group: state.CurrentGroup
});

const mapActionToProp = {
  onsubmit: add,
  
};

export default connect(mapPropToState, mapActionToProp)(SelectMember);

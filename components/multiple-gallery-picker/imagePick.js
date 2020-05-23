import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,//localhost
  TouchableOpacity,
  Animated,
  Image
} from 'react-native';
import * as Permissions from 'expo-permissions';
import ImageBrowser from './components/MultipleImagePicker/ImageBrowser';

const { height } = Dimensions.get('screen');
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      height: height / 2,
    };
  }

  _pickImage = async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    if (cameraRollPerm === 'granted') {
      this.setState({ isOpen: true });
    }
  };

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  handleImages = images => {
    console.log('picked images', images);
  };

  render() {
    const { isOpen } = this.state;
    return (
      <View style={styles.container}>
      {/* <Image source={{uri:''}} /> */}
        <TouchableOpacity onPress={this._pickImage}>
          <Text>Open Picker</Text>
        </TouchableOpacity>

        {
          <Modal
            animated={true}
            ref={ref => (this._modal = ref)}
            animationType="slide"
            transparent={true}
            visible={isOpen}
            onRequestClose={() => {}}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={this.toggleModal}
              />
              <View style={styles.modalContainer}>
                <ImageBrowser
                  onRequestClose={this.toggleModal}
                  pickedImages={this.handleImages}
                />
              </View>
            </View>
          </Modal>
        }
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#fff',
    paddingBottom: 18,
    position: 'absolute',
    bottom: 0,
    height: height / 2,
    borderTopWidth: 0.5,
    borderTopColor: 'grey',
  },
  header: {
    backgroundColor: '#f7f5eee8',
    shadowColor: '#000000',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
});

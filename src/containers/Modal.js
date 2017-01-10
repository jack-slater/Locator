import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Modal
} from 'react-native';
import Button from 'apsl-react-native-button';
let { height, width } = Dimensions.get('window');


export class MapModal extends Component {
  render () {
    return (
      <View>
        <Modal
          animationType={'slide'}
          visible={this.props.visible}
          transparent={true}
          setModalVisibility={this.props.setModalVisibility}
          onRequestClose={this.props.closeModal}
          >
          <View style={styles.modal}>
            <Text style={styles.text}>This is a modal</Text>
            <Text style={styles.text}>{this.props.props}</Text>
            <Button
              style={styles.button}
              onPress={this.props.closeModal}
            >
              <Text style={styles.text}>close</Text>
            </Button>
          </View>
        </Modal>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  modal: {
    width: width * 0.9,
    height: height * 0.85,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(1,1,1,0.8)',
    marginTop: 20,
    marginLeft: 20,
    borderRadius: 5
  },
  text: {
    color: 'white'
  },
  button: {
    position: 'absolute',
    bottom: 10,
    right: 60,
    width: width * 0.6,
    borderColor: '#f5f5f5',
    paddingLeft: 50,
    paddingRight: 50
  }
});

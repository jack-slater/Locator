import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Modal
} from 'react-native';
import Button from 'apsl-react-native-button';

export class MapModal extends Component {
  render () {
    return (
      <View>
        <Modal
          style={{ flex: 1 }}
          animationType={'slide'}
          transparent={false}
          visible={this.props.visible}
          setModalVisibility={this.props.setModalVisibility}
          onRequestClose={this.props.closeModal}
          >
          <View>
            <Text>This is a modal</Text>
          </View>
          <Button
            onPress={this.props.closeModal}
          >
            <Text>close</Text>
          </Button>
          <Text>{this.props.props}</Text>
        </Modal>
      </View>
    );
  }
};

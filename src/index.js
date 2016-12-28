import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export class Locator extends Component {
  constructor () {
    super();
    this.state = {
      location: 'unknown'
    }
  }

  showLocation () {
    navigator.geolocation.getCurrentPosition(pos => {
      const location = JSON.stringify(pos);
      this.setState({location});
    },
    error => console.warn(JSON.stringify(error)),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.showLocation.bind(this)}>
          <Text>Press Me</Text>
        </TouchableOpacity>
        <View>
          <Text>{this.state.props}</Text>
        </View>
      </View>
    );
  }
}

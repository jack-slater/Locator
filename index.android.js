import React, { Component } from 'react';
import { AppRegistry, View, Text, StyleSheet } from 'react-native';
import Button from 'apsl-react-native-button';

export class Locator extends Component {
  constructor () {
    super();
    this.state = {
      long: 'unknown',
      lat: 'unknown',
      num: 0
    };
  }

  componentDidMount () {
    navigator.geolocation.watchPosition(pos => {
      const long = +pos.coords.longitude;
      const lat = +pos.coords.latitude;
      this.setState({long: long, lat: lat, num: this.state.num + 1});
    },
    error => console.warn(JSON.stringify(error)),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 5}
    );
  }


  render () {
    return (
      <View style={styles.container}>
    {/* <View>
          <Button
            onPress={this.showLocation.bind(this)}
            style={styles.button}
            textStyle={styles.buttonText}
            children={'Press Me'}
          />
        </View> */}
        <View style={styles.coords}>
          {this.state.lat !== 'unknown' &&
            <Text style={styles.coordsText}>
              ({this.state.lat} , {this.state.long})
            </Text> }
        </View>
        <View style={styles.coords}>
          <Text style={styles.coordsText}>
            {this.state.num}
          </Text>
        </View>
      </View>
    );

  }

}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 5,
    height: 60,
    width: 120
  },
  buttonText: {
    color: 'white',
    flex: 0.2
  },
  coordsText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
  }
})


AppRegistry.registerComponent('Locator', () => Locator);

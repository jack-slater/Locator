import MapView from 'react-native-maps';
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';

export class Map extends Component {
  constructor () {
    super();
    this.state = {
      region: {
        latitude: 53.451562,
        longitude: -2.249320,
        latitudeDelta: 0.0082,
        longitudeDelta: 0.0081
      },
      lat: 0,
      long: 0
    };
  }


  // componentDidMount () {
  //   navigator.geolocation.watchPosition(pos => {
  //     const long = +pos.coords.longitude;
  //     const lat = +pos.coords.latitude;
  //     this.setState({long, lat});
  //   },
  //   error => console.warn(JSON.stringify(error)),
  //   {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 1}
  //   );
  // }



  render () {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          showsUserLocation={true}
          followUserLocation={true}
        >
          <MapView.Marker
            coordinate={{latitude: 53.434517, longitude: -2.228028}}
            title={'Pigeon'}
            description={'This is the location of you'}
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
});

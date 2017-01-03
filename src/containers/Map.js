import MapView from 'react-native-maps';
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';
import haversine from 'haversine';

export class Map extends Component {
  constructor () {
    super();
    this.state = {
      lat: 0,
      long: 0,
      distA: 'unknown',
      distB: 'unknown',
      distC: 'unknown',
      markers: [{title: 'A', latlng: {latitude: 53.434517, longitude: -2.228028}, description: 'first marker'},
      {title: 'B', latlng: {latitude: 53.435821, longitude: -2.225633}, description: 'second marker'},
      {title: 'C', latlng: {latitude: 53.43508, longitude: -2.227392}, description: 'third marker'}
    ]
    };
  }

  componentDidMount () {
    navigator.geolocation.watchPosition(pos => {
      const {markers} = this.state;
      const long = +pos.coords.longitude;
      const lat = +pos.coords.latitude;
      const distA = haversine({latitude: lat, longitude: long},
      {latitude: markers[0].latlng.latitude, longitude: markers[0].latlng.longitude}, {unit: 'meter'}).toFixed(0);
      const distB = haversine({latitude: lat, longitude: long},
      {latitude: markers[1].latlng.latitude, longitude: markers[1].latlng.longitude}, {unit: 'meter'}).toFixed(0);
      const distC = haversine({latitude: lat, longitude: long},
      {latitude: markers[2].latlng.latitude, longitude: markers[2].latlng.longitude}, {unit: 'meter'}).toFixed(0);
      this.setState({long, lat, distA, distB, distC});
    },
    error => console.warn(JSON.stringify(error)),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 5}
    );
  }

  render () {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: 53.451562,
            longitude: -2.249320,
            latitudeDelta: 0.0082,
            longitudeDelta: 0.0081
          }}
          onRegionChange={this.onRegionChange}
          showsUserLocation={true}
          followUserLocation={true}
        >
        {this.state.markers.map(marker => (
          <MapView.Marker
            key={marker.title}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          />
        ))}
        </MapView>
        <View style={styles.textContainer}>
          {this.state.distA !== 'unknown' && <Text>
            {this.state.distA < 10 ? <Text>You have solved A</Text> : <Text>{this.state.distA}</Text> }
          </Text> }
          {this.state.distB !== 'unknown' && <Text>
            {this.state.distB < 10 ? <Text>You have solved B</Text> : <Text>{this.state.distB}</Text> }
          </Text> }
          {this.state.distC !== 'unknown' && <Text>
            {this.state.distC < 10 ? <Text>You have solved C</Text> : <Text>{this.state.distC}</Text> }
          </Text> }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 0.8,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 10
  },
  textContainer: {
    height: 60
  }
});

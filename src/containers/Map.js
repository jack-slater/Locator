import MapView from 'react-native-maps';
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';
import haversine from 'haversine';
import {MapModal} from './Modal';

export class Map extends Component {
  constructor () {
    super();
    this.state = {
      lat: 0,
      long: 0,
      dist: [],
      markers: [{id: '1', title: 'A', latlng: {latitude: 53.434517, longitude: -2.228028}, description: 'first marker'},
      {id: '2', title: 'B', latlng: {latitude: 53.435821, longitude: -2.225633}, description: 'second marker'},
      {id: '3', title: 'C', latlng: {latitude: 53.43508, longitude: -2.227392}, description: 'third marker'}
      ],
      modalVisible: false

    };
  }
  setModalVisibility (visible) {
    this.setState({modalVisible: visible});
  }

  handlePress () {
    this.setState({modalVisible: true});
  }
  handleChange () {
    this.setModalVisibility(true);
  }
  setModalProps () {
    let props;
    let dist = this.state.dist.reduce((acc, a) => {
      if (a.dist < 10) {
        acc = a.id;
      }
      return acc;
    }, '');
    this.state.markers.map((marker) => {
      if (dist === marker.id) {
        props = marker.description;
      }
    });
    return props;
  }
    // if (this.state.distB < 10) {
    //   return props = this.state.markers[1].description;
    // }
    // if (this.state.distA < 10) {
    //   return props = this.state.markers[0].description;
    // }
  removeMarker (id) {
    var index = this.state.markers.findIndex(function (marker) {
      return marker.id === id;
    });
    var newState = this.state.markers.slice(0, index).concat(this.state.markers.slice(index + 1));
    return newState;
  }
  closeModal () {
    let id = this.state.dist.reduce((acc, a) => {
      if (a.dist < 10) {
        acc = a.id;
      }
      return acc;
    }, '');
    this.setState({modalVisible: false, markers: this.removeMarker(id)});

  }
  componentDidMount () {
    navigator.geolocation.watchPosition(pos => {
      const {markers} = this.state;
      const long = +pos.coords.longitude;
      const lat = +pos.coords.latitude;
      const distances = this.state.markers.map((marker, i) => {
        const dist = {latitude: lat, longitude: long};
        return {
          id: marker.id,
          dist: haversine(dist,
          {latitude: markers[i].latlng.latitude, longitude: markers[i].latlng.longitude}, {unit: 'meter'}).toFixed(0)
        };
      });
      // const distA = haversine({latitude: lat, longitude: long},
      // {latitude: markers[0].latlng.latitude, longitude: markers[0].latlng.longitude}, {unit: 'meter'}).toFixed(0);
      // const distB = haversine({latitude: lat, longitude: long},
      // {latitude: markers[1].latlng.latitude, longitude: markers[1].latlng.longitude}, {unit: 'meter'}).toFixed(0);
      // const distC = haversine({latitude: lat, longitude: long},
      // {latitude: markers[2].latlng.latitude, longitude: markers[2].latlng.longitude}, {unit: 'meter'}).toFixed(0);
      this.setState({
        dist: distances,
        modalVisible: this.state.dist.forEach((a) => {
          if (a.dist < 10) {
            return true;
          } else return false;
        })
      });
      // this.setState({long, lat, distA, distB, distC, modalVisible: distB < 10 || distA < 10});
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
          initialRegion={{
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
            key={marker.id}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          />
        ))}
        </MapView>
        <View style={styles.textContainer}>
          {this.state.dist.map((a, i) => {
            return a.dist !== 'unknown' && <Text key={i}>
              {a.dist < 10 ? <Text>hello</Text> : <Text>{a.dist}</Text> }
            </Text>;
          })
        }
        </View>
        <MapModal
          visible={this.state.modalVisible}
          closeModal={this.closeModal.bind(this)}
          props={this.setModalProps()}
        />
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

// {this.state.distA !== 'unknown' && <Text>
//   {this.state.distA < 10 ? 'first marker' : <Text>{this.state.distA}</Text> }
// </Text> }
//
//   {this.state.distB !== 'unknown' && <Text>
//     {this.state.distB < 10 ? 'jkkj' : <Text>{this.state.distB}</Text> }
//   </Text> }
//   {this.state.distC !== 'unknown' && <Text>
//     {this.state.distC < 10 ? <Text>You have solved C</Text> : <Text>{this.state.distC}</Text> }
//   </Text> }

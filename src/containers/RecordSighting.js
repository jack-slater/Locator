import MapView from 'react-native-maps';
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';

export class RecordSighting extends Component {
  render () {
    return (
      <View>
        <Text>record sighting options</Text>
      </View>
    );
  }
}

// export class Root extends Component {
//   constructor () {
//     super();
//     this.state = {
//       showList: false
//     };
//   }
//
//   showList () {
//     this.setState({ showList: true });
//   }
//
//   renderRoot (Component) {
//     return (
//       <Component showList={this.showList.bind(this)} />
//     );
//   }
//
//   render () {
//     const { showList } = this.state;
//     return showList ? this.renderRoot(SaveAnimal) : this.renderRoot(Map);
//   }
// }

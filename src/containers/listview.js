import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import request from 'superagent';

export class Listview extends Component {
  constructor () {
    super();
    this.state = {
      animals: []
    };
  }

  componentDidMount () {
    request
      .get(`http://localhost:3000/animals`)
      .end((err, res) => {
        if (err) console.log(err);
        console.warn(res);
        this.setState({animals: res.body});
      });
  }

  getPicture (address) {
    request
      .get(address)
      .end((err, res) => {
        if (err) console.log(err);
        this.setState({animals: res.body});
      });
  }

  render () {
    return (
      <View style={styles.container}>
        {this.state.animals.length > 0 && this.state.animals.map(animal => {
          <View>{animal.common_name}</View>
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

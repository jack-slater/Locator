import { WithUser } from './WithUser';
import { WithoutUser } from './WithoutUser';
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native';

export class Async extends Component {
  constructor () {
    super();
    this.state = {
      userInput: '',
      user: null,
      loading: false
    };
  }

  componentDidMount () {
    // AsyncStorage.removeItem('user');
    this.setState({loading: true})
    AsyncStorage.getItem('user').then((value) => {
      this.setState({'user': value})
    }).then(
      setTimeout(() => {
        this.stopLoading()
      }, 2000))
    .done();
  }

  stopLoading () {
    this.setState({loading: false})
  }

  handleChange = (value) => {
    this.setState({'userInput': value});
  }

  handlePress = () => {
    AsyncStorage.setItem('user', this.state.userInput);
    this.setState({user: this.state.userInput})
  }

  render () {
    return (
      <View style={styles.topContainer}>
        {this.state.loading === true && <Text style={styles.loading}>WildFind</Text>}
        {this.state.loading === false && this.state.user === null && <WithoutUser handleChange={this.handleChange}
          handlePress={this.handlePress} userInput={this.state.userInput} />}
        {this.state.loading === false && this.state.user !== null && <WithUser user={this.state.user} /> }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1
  },
  loading: {
    flex: 1,
    margin: 100,
    textAlign: 'center',
    fontSize: 40
  }
});

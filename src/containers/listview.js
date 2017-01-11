import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ListView
} from 'react-native';
import request from 'superagent';
import animalData from '../../smallimg';
import AnimalItem from './AnimalItem';

console.warn(animalData)

export class Listview extends Component {
  constructor (props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(animalData)
    };
}

  // componentDidMount () {
  //   request
  //     .get(`http://192.168.122.1:3000/animals`)
  //     .end((err, res) => {
  //       if (err) console.log(err);
  //
  //       this.setState({animals: res.body});
  //     });
  // }

  // getPicture (address) {
  //   request
  //     .get(address)
  //     .end((err, res) => {
  //       if (err) console.log(err);
  //       this.setState({animals: res.body});
  //     });
  // }

  render () {
    return (
      <View style={styles.container}>
        <ListView
          contentContainerStyle={styles.list}
          dataSource={this.state.dataSource}
          renderRow={(animal) =>
            <View style={styles.item}>
                <Image
                  style= {{ height:100, width: 100 }}
                  source={{uri: animal.smallImg}}
                />
              <Text>{animal.common_name}</Text>
            </View>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  item: {
    width: 100,
    height: 110,
    margin: 5
  }
});

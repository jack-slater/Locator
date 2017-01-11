import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';

export const AnimalItem = ({common_name, photo}) => (
  <View style={styles.container}>
      <Image
        style={styles.logo}
        style= {{ height:100, width: 100 }}
        source={{uri: photo}}
      />
    <Text>{common_name}</Text>
  </View>
);



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

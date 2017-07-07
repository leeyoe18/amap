/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {MapView} from 'react-native-amap3d'

export default class amap extends Component {
  render() {
    return (
        <View style={styles.container}>
            <MapView
                coordinate={{
                    latitude: 39.91095,
                    longitude: 116.37296,
                }}
                style={StyleSheet.absoluteFill}
            >

            </MapView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('amap', () => amap);

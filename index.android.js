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

import App from './containers/app';

export default class amap extends Component {
  render() {
    return (
        <App/>
    );
  }
}

AppRegistry.registerComponent('amap', () => amap);

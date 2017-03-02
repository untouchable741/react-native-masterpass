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

import Masterpass from './src/Masterpass';

export default class ReactNativeMasterpass extends Component {

  onPairingCompleted = (result) => {
    console.log(result);
  }

  onPairingFail = (error) => {
    console.log(error);
  }

  render() {
    return (
      <View style={styles.container}>
        <Masterpass onPairingCompleted={this.onPairingCompleted} onPairingFail={this.onPairingFail}/>
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

AppRegistry.registerComponent('ReactNativeMasterpass', () => ReactNativeMasterpass);
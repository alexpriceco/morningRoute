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
  View,
  PixelRatio,
  Navigator,
  TouchableHighlight,
  AsyncStorage
} from 'react-native'

import FirstTouch from './components/FirstTouch.js'
import Dashboard from './components/Dashboard.js'
import AddRoute from './components/AddRoute.js'

export default class morningRoute extends Component {
  constructor() {
    super()
    this.state = {
      routes: {}
    }
  }

  async _isFirstUse() {
      try {
        const value = await AsyncStorage.getItem('@Routes');
        if (value !== null){
          // We have data!!
          this.setState({routes: value})
        } else {
          return true
        }
      } catch (error) {
        console.warn(error)
      }

  }

    render() {
        return (
        <Navigator
            style={styles.container}
            initialRoute={{id: 'first'}}
            renderScene={this.navigatorRenderScene}
            // configureScene={(route, routeStack) => {
            //     Navigator.SceneConfigs.FloatFromBottom
            // }} TODO: unbreak this
        />

        )
    }

    navigatorRenderScene(route, navigator) {
        switch (route.id) {
            case 'first':
                return (<FirstTouch navigator={navigator} title="first"/>)
            case 'second':
                return (<AddRoute navigator={navigator} currentStep='1' isNew='true' title="second" />)
            case 'third':
                return (<AddRoute navigator={navigator} currentStep='1' isNew='false' title="third" />)
            case 'dashboard':
                return (<Dashboard navigator={navigator} title='fourth' />)
        }
    }
}

const styles = StyleSheet.create({})
AppRegistry.registerComponent('morningRoute', () => morningRoute);

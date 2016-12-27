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
  TouchableHighlight
} from 'react-native'

import FirstTouch from './components/FirstTouch.js'
import AddRoute from './components/AddRoute.js'

export default class morningRoute extends Component {
  constructor() {
    super()
    this.state = {
      routes: {}
    }
  }

  _isFirstUse() {
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
        _navigator = navigator;
        switch (route.id) {
            case 'first':
                return (<FirstTouch navigator={navigator} title="first"/>)
            case 'second':
                return (<AddRoute navigator={navigator} currentStep='1' buttonText='Next' isNew='true' title="second" />)
            case 'third':
                return (<AddRoute navigator={navigator} currentStep='1' buttonText='Next' isNew='false' title="third" />)
            case 'fourth':
                return (<Dashboard navigator={navigator}
                title='fourth' routes={this.state.routes}/>)
        }
    }

    // render() {
    //     const routes = [
    //         {title: 'FirstTouch'},
    //         {title: 'AddRoute'},
    //     ]
    //
    //     return (
    //         <Navigator
    //             initialRoute={routes[0]}
    //             renderScene={(route, navigator) =>
    //                 <FirstTouch
    //                     title={route.title}
    //                     navigator={navigator}
    //                     routes={routes}
    //
    //                     // Function to call to go back to the previous scene
    //                     onBack={() => {
    //                         if (route.index > 0) {
    //                             navigator.pop();
    //                         }
    //                     }}
    //                 />
    //             }
    //         />
    //     )
    // }
}

const styles = StyleSheet.create({})
AppRegistry.registerComponent('morningRoute', () => morningRoute);

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
    _isFirstUse() { return true }

    render() {
        return (
        <Navigator
            style={styles.container}
            initialRoute={{id: 'first'}}
            renderScene={this.navigatorRenderScene}
            configureScene={(route, routeStack) => {
                Navigator.SceneConfigs.FloatFromBottom
            }}
        />

        )
    }

    navigatorRenderScene(route, navigator) {
        _navigator = navigator;
        switch (route.id) {
            case 'first':
                return (<FirstTouch navigator={navigator} title="first"/>);
            case 'second':
                return (<AddRoute navigator={navigator} title="second" />);
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

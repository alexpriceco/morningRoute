import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  PixelRatio
} from 'react-native';

export default class FirstTouch extends Component {
    static get defaultProps() { return { title: 'FirstTouch' } }

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.bold}>
                    Morning Route
                </Text>
                <View>
                  <Text>
                    Cards go here
                  </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#2E80ED'
    },
    bold: {
        fontSize: 20,
        textAlign: 'left',
        marginVertical: 5,
        marginHorizontal: 30,
        color: '#FFFFFF',
        fontWeight: '600'
    }
})

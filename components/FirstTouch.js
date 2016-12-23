import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  PixelRatio
} from 'react-native';

export default class morningRoute extends Component {
    static get defaultProps() { return { title: 'FirstTouch' } }

    componentDidMount() {
        setTimeout(() => {
            console.log('Running through the 6...')
            this.props.navigator.push({
              id: 'second'
            })
        }, 1000)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.bold}>
                    Morning Route
                </Text>
                <Text style={styles.bold}>
                    Get updates on traffic conditions, and never be late to work again.
                </Text>
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

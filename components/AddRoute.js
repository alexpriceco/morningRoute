import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  PixelRatio
} from 'react-native';

export default class AddRoute extends Component {
    static get defaultProps() { return { title: 'AddRoute' } }

    render() {
        return (
            <View style={styles.container}>
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
        backgroundColor: '#FFF'
    },
    bold: {
        fontSize: 20,
        textAlign: 'left',
        marginVertical: 5,
        marginHorizontal: 30,
        color: '#232323',
        fontWeight: '600'
    }
})

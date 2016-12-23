import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  PixelRatio
} from 'react-native';

export default class Input extends Component {
    // static get defaultProps() { return { title: 'Input' } }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.children}</Text>
                <TextInput placeholder={this.props.placeholder} onChangeText={this.props.setText} />
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
    text: {
        fontSize: 20,
        textAlign: 'left',
        marginVertical: 5,
        marginHorizontal: 30,
        color: '#232323'
    }
})

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  PixelRatio,
  Dimensions
} from 'react-native';

export default class Input extends Component {
    // static get defaultProps() { return { title: 'Input' }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.children}</Text>
                <TextInput placeholder={this.props.placeholder} onChangeText={this.props.setText} style={styles.input} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        width: Dimensions.get('window').width,
        backgroundColor: '#FFF'
    },
    input: {
        textAlign: 'left',
        borderBottomColor: '#232323',
        borderBottomWidth: 2,
        height: 40,
        marginVertical: 5,
        marginHorizontal: 30,
        backgroundColor: 'transparent'
    },
    text: {
        fontSize: 20,
        textAlign: 'left',
        marginVertical: 5,
        marginHorizontal: 30,
        color: '#232323'
    }

})

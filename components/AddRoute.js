import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableHighlight
} from 'react-native';

export default class AddRoute extends Component {
    static get defaultProps() { return { title: 'AddRoute' } }

    _animationHandler(currStep) {
        console.log(currStep)
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.content}>
                    <Text style={styles.bold}>
                        Get updates on traffic conditions, and never be late to work again.
                    </Text>

                    {/* Input elements goes here */}
                </View>

                <View style={styles.navigation}>
                    <View style={styles.indicators}>
                        <View style={styles.indicator}></View>
                        <View style={styles.indicator}></View>
                        <View style={styles.indicator}></View>
                        <View style={styles.indicator}></View>
                    </View>

                    <TouchableHighlight
                        onPress={this._animationHandler(this.props.currentStep)}
                        style={styles.button}
                        >
                        <Text style={styles.buttonText}>{this.props.buttonText}</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flex: 1
    },
    content: {
        flexGrow: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    navigation: {
        // flexGrow: 2
    },
    bold: {
        fontSize: 20,
        textAlign: 'left',
        marginVertical: 5,
        marginHorizontal: 30,
        color: '#232323',
        fontWeight: '600'
    },
    indicators: {
        alignSelf: 'center',
        flexDirection: 'row',
        marginBottom: 12
    },
    indicator: {
        width: 8,
        height: 8,
        margin: 6,
        borderRadius: 100,
        backgroundColor: '#CCCCCC',
    },
    button: {
        padding: 20,
        backgroundColor: '#2E80ED',
        // position: 'absolute',
        // bottom: 0,
        // flexGrow: 1
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 20,
        color: '#FFFFFF'
    }
})

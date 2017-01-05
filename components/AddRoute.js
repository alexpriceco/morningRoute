import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableHighlight,
  DatePickerIOS,
  Dimensions,
  Animated,
  AsyncStorage
} from 'react-native'
import Input from './Input'

export default class AddRoute extends Component {
    static get defaultProps() { return {
      title: 'AddRoute'
    } }

    constructor(props) {
        super(props)
        this.state = {
            date: new Date,
            hours: 0,
            minutes: 0,
            inputsTo: '',
            inputsWhen: new Date,
            inputsPreview: '',
            inputsFrom: '',
            inputsName: '',
            inputs: {
                to: 'a',
                from: 'a',
                when: new Date,
                name: 'a'
            },
            currentStep: new Animated.Value(1),
            indicator1: {},
            indicator2: {},
            indicator3: {},
            indicator4: {}
        }

        const blu = 'rgb(46,128,237)'
        const grey = 'rgb(204,204,204)'
        const white = 'rgb(255,255,255)'

        //indicator1
        this.state.indicator1.backgroundColor = this.state.currentStep.interpolate({
            inputRange:  [1, 2, 3, 4],
            outputRange: [white, blu, blu, blu]
        }),
        this.state.indicator1.borderColor = this.state.currentStep.interpolate({
            inputRange:  [1, 2, 3, 4],
            outputRange: [blu, blu, blu, blu]
        }),

        // indicator2
        this.state.indicator2.backgroundColor = this.state.currentStep.interpolate({
            inputRange:  [1, 2, 3, 4],
            outputRange: [grey, white, blu, blu]
        }),
        this.state.indicator2.borderColor = this.state.currentStep.interpolate({
            inputRange:  [1, 2, 3, 4],
            outputRange: [grey, blu, blu, blu]
        }),

        // indicator3
        this.state.indicator3.backgroundColor = this.state.currentStep.interpolate({
            inputRange:  [1, 2, 3, 4],
            outputRange: [grey, grey, white, blu]
        }),
        this.state.indicator3.borderColor = this.state.currentStep.interpolate({
            inputRange:  [1, 2, 3, 4],
            outputRange: [grey, grey, blu, blu]
        }),

        // indicator4
        this.state.indicator4.backgroundColor = this.state.currentStep.interpolate({
            inputRange:  [1, 2, 3, 4],
            outputRange: [grey, grey, grey, white]
        }),
        this.state.indicator4.borderColor = this.state.currentStep.interpolate({
            inputRange:  [1, 2, 3, 4],
            outputRange: [grey, grey, grey, blu]
        })
    }

    async _animationHandler() {

        if (this.state.currentStep._value == 4) {
            this.setState({
                inputs: {
                    to:   this.state.inputsTo,
                    from: this.state.inputsFrom,
                    // when: this.state.inputsWhen,
                    name: this.state.inputsName
                }
            })

            try {
                console.log(this.state.inputs);
                await AsyncStorage.setItem('@Routes:initial', this.state.inputs.to)
            } catch (error) {
                console.log(error) // TODO: This should probably be more robust
            }
        } else {
            if (true) { // select input this.state.currentStep._value, determine if input!=null
                let nextVal = this.state.currentStep._value + 1
                Animated.timing(this.state.currentStep, {
                    toValue: nextVal,
                    duration: 200
                }).start(() => { this.state.currentStep._value = nextVal })
            } else {
              // shake the input box to indicate the user should actually fill it
            }
        }
    }

    render() {

        let content
        if (this.props.isNew) {
            content = (
                <View style={styles.inputsWrapper}>
                    <Input placeholder='1234 Anydrive Road' setText={(text) => this.setState({inputsTo: text})}>Where are you going?</Input>

                    <Text style={styles.text}>When do you need to be there?</Text>
                    <DatePickerIOS date={this.state.inputsWhen} mode='time' minuteInterval={15} onDateChange={(banana) => this.setState({inputsWhen: banana})} />
                    {/* <Preview></Preview> TODO: Build the preview component,
                        and pass in target address, and arrival time; will need
                        to hit the API. */}
                    <Input placeholder='1234 Anydrive Road' setText={(text) => this.setState({inputsFrom: text})}>Where do you leave from?</Input>
                </View>
            )
        } else {
            content = (
                <View>
                    {/* <Input placeholder='some placeholder' setText={(text) => this.setState({inputs.to})}>This is the prompt</Input>
                    <Input placeholder='some placeholder' setText={(text) => this.setState({inputs.when})}>This is the prompt</Input>
                    <Input placeholder='some placeholder' setText={(text) => this.setState({inputs.from})}>This is the prompt</Input>
                    <Input placeholder='some placeholder' setText={(text) => this.setState({inputs.name})}>This is the prompt</Input> */}
                </View>
            )
        }

        return (
            <View style={styles.container}>

                <View style={styles.content}>
                    <Text style={styles.bold}>
                        Get updates on traffic conditions, and never be late to work again.
                    </Text>
                    { content }
                </View>

                <View style={styles.navigation}>
                    <View style={styles.indicators}>

                        <Animated.View style={[styles.indicator,
                            {backgroundColor: this.state.indicator1.backgroundColor},
                            {borderColor: this.state.indicator1.borderColor}]}>
                        </Animated.View>

                        <Animated.View style={[styles.indicator,
                            {backgroundColor: this.state.indicator2.backgroundColor},
                            {borderColor: this.state.indicator2.borderColor}]}>
                        </Animated.View>

                        <Animated.View style={[styles.indicator,
                            {backgroundColor: this.state.indicator3.backgroundColor},
                            {borderColor: this.state.indicator3.borderColor}]}>
                        </Animated.View>

                        <Animated.View style={[styles.indicator,
                            {backgroundColor: this.state.indicator4.backgroundColor},
                            {borderColor: this.state.indicator4.borderColor}]}>
                        </Animated.View>

                    </View>

                    <TouchableHighlight
                        onPress={this._animationHandler.bind(this)}
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
        borderWidth: 2,
        backgroundColor: '#FFF',
        borderColor: 'rgb(204,204,204)',
    },
    button: {
        padding: 20,
        backgroundColor: '#2E80ED'
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 20,
        color: '#FFF'
    },
    inputsWrapper: {
        flexWrap: 'nowrap',
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        overflow: 'hidden',
        alignSelf: 'stretch',
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

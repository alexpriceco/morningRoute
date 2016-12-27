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
} from 'react-native';
import Input from './Input'

export default class AddRoute extends Component {
    static get defaultProps() { return { title: 'AddRoute' } }

    constructor(props) {
        super(props)
        this.state = {
            inputsTo: '',
            inputsWhen: new Date(new Date().setMinutes(0)),
            inputsPreview: '',
            inputsFrom: '',
            inputsName: '',
            inputs: {
                to: '',
                from: '',
                when: new Date(new Date().setMinutes(0)),
                name: ''
            },
            currentStep: 1,
            indicator2: {
                status: new Animated.Value(0),
                backgroundColor: 'rgb(204,204,204)',
                borderColor: 'rgb(204,204,204)',
            },
            indicator3: {
                status: new Animated.Value(0),
                backgroundColor: 'rgb(204,204,204)',
                borderColor: 'rgb(204,204,204)',
            },
            indicator4: {
                status: new Animated.Value(0),
                backgroundColor: 'rgb(204,204,204)',
                borderColor: 'rgb(204,204,204)',
            },
            indicator1: {}
        },
        this.state.indicator1.status = new Animated.Value(50),
        this.state.indicator1.backgroundColor = this.state.indicator1.status.interpolate({
            inputRange: [0, 50, 100],
            outputRange: ['rgb(255,255,255)', 'rgb(255,255,255)', 'rgb(46,128,237)']
        }),
        this.state.indicator1.borderColor = 'rgb(46,128,237)'
    }

    // Handles animation and updates for the dot indicators
    _setIndicatorState() {

        Animated.timing(this.state.indicator1.status, {
            toValue: 100,
            duration: 300
        }).start(() => {
            console.log('Done animating: ', this.state.indicator1.status)
        })



        // this.colorValue = new Animated.Value(0)
        //
        // colorChange() {
        //     this.colorValue.setValue(0)
        //     Animated.timing(this.colorValue, {
        //         toValue: 100,
        //         duration: 5000
        //     }).start(() => {
        //         this.colorChange()
        //     })
        // }
        //
        // const colorAnimation = this.colorValue.interpolate({
        //     inputRange: [0, 50, 100],
        //     outputRange: ['yellow', 'orange', 'red']
        // })

        // The best way we could find to dynamically update the indicator styles
        // based on the currentStep value...
        // var keyCurrent = 'indicator' + (this.state.currentStep)
        // var valCurrent = indicatorActive
        // var objCurrent  = {}
        // objCurrent[keyCurrent] = valCurrent
        // this.setState(objCurrent)
        //
        // var keyPrevious = 'indicator' + (this.state.currentStep - 1)
        // var valPrevious = indicatorFilled
        // var objPrevious  = {}
        // objPrevious[keyPrevious] = valPrevious
        // this.setState(objPrevious)
    }

    async _animationHandler() {
        console.log(this.state.currentStep)
        this.state.currentStep++
        this._setIndicatorState()

        if (this.state.currentStep == 4) {

          this.setState({
            inputs: {
              to: this.state.inputsTo,
              from: this.state.inputsFrom,
              when: this.state.inputsWhen,
              name: this.state.inputsName
            }
          })

          try {
            await AsyncStorage.setItem('@Routes:initial', this.state.inputs);
          } catch (error) {
            // Error saving data
          }
        }

        // Incremenet currStep; if it's not the fourth step, then
            // Slide out old Input, slide in new Input
            // assign filled to old indicator, active to new indicator
        // else call Navigator to go to dashboard

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
        backgroundColor: 'rgb(255,255,255)',
        borderColor: 'rgb(204,204,204)',
    },
    button: {
        padding: 20,
        backgroundColor: '#2E80ED'
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 20,
        color: '#FFFFFF'
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

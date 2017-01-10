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
            to: '600 Congress Ave',
            from: '5808 Miramonte Dr',
            when: new Date,
            routeName: '',
            routeSummary: 'a',
            notifTime: '',
            driveTime: '',
            currentStep: new Animated.Value(1),
            indicator1: {},
            indicator2: {},
            indicator3: {},
            indicator4: {},
            inputsWrapper: { marginLeft: 0 },
            buttonText: "Next 👍",
            buttonBackground: 'rgb(204,204,204)',
            buttonTextColor: 'rgb(124,124,124)',
            buttonDisabled: true,
        }

        const grey90 = 'rgb(35,35,35)'
        const blue50 = 'rgb(46,128,237)'
        const grey70 = 'rgb(124,124,124)'
        const grey60 = 'rgb(150,150,150)'
        const grey50 = 'rgb(173,173,173)'
        const grey40 = 'rgb(204,204,204)'
        const grey00 = 'rgb(255,255,255)'

        //indicator1
        this.state.indicator1.backgroundColor = this.state.currentStep.interpolate({
            inputRange:  [1, 2, 3, 4],
            outputRange: [grey00, blue50, blue50, blue50]
        }),
        this.state.indicator1.borderColor = this.state.currentStep.interpolate({
            inputRange:  [1, 2, 3, 4],
            outputRange: [blue50, blue50, blue50, blue50]
        }),

        // indicator2
        this.state.indicator2.backgroundColor = this.state.currentStep.interpolate({
            inputRange:  [1, 2, 3, 4],
            outputRange: [grey40, grey00, blue50, blue50]
        }),
        this.state.indicator2.borderColor = this.state.currentStep.interpolate({
            inputRange:  [1, 2, 3, 4],
            outputRange: [grey40, blue50, blue50, blue50]
        }),

        // indicator3
        this.state.indicator3.backgroundColor = this.state.currentStep.interpolate({
            inputRange:  [1, 2, 3, 4],
            outputRange: [grey40, grey40, grey00, blue50]
        }),
        this.state.indicator3.borderColor = this.state.currentStep.interpolate({
            inputRange:  [1, 2, 3, 4],
            outputRange: [grey40, grey40, blue50, blue50]
        }),

        // indicator4
        this.state.indicator4.backgroundColor = this.state.currentStep.interpolate({
            inputRange:  [1, 2, 3, 4],
            outputRange: [grey40, grey40, grey40, grey00]
        }),
        this.state.indicator4.borderColor = this.state.currentStep.interpolate({
            inputRange:  [1, 2, 3, 4],
            outputRange: [grey40, grey40, grey40, blue50]
        }),

        this.state.inputsWrapper.marginLeft = this.state.currentStep.interpolate({
            inputRange:  [1, 2, 3, 4],
            outputRange: [0, (-Dimensions.get('window').width), (-2*(Dimensions.get('window').width)), (-3*(Dimensions.get('window').width))]
        })
    }

    _getPreviewRoute() {
      let time = Math.floor(this.state.when.getTime() / 1000) + 604800
      let from = this.state.from.replace(/\s+/g, '+')
      let to = this.state.to.replace(/\s+/g, '+')
      let req = `https://maps.googleapis.com/maps/api/directions/json?origin=${from}&destination=${to}&region=us&departure_time=${time}&traffic_model&key=AIzaSyB3xsLMFn2XoZfmywOnsWn8tf0Ffvw7FF0`
      return fetch(req).then((res) => res.json()).then((res) => {
        console.log(res)
        let routeSummary = res.routes[0].summary
        let driveTime = res.routes[0].legs[0].duration_in_traffic.text

        let travelTimeInSeconds = res.routes[0].legs[0].duration_in_traffic.value
        let tmpTime = new Date(this.state.when.getTime() - travelTimeInSeconds*1000)
        let notifTime = tmpTime.getHours() + ':' + tmpTime.getMinutes()

        this.setState({routeSummary, driveTime, notifTime})
        return `${routeSummary} ${driveTime}`
      })
    }

    _buttonHandler() {
      this.setState({buttonBackground: 'rgb(204,204,204)'})
      this.setState({buttonTextColor:  'rgb(124,124,124)'})
      this.setState({buttonDisabled: true})

      switch (this.state.currentStep._value) {
        case 1:
          if (this.state.to.length > 0) {
            this.setState({buttonBackground: 'rgb(46,128,237)'})
            this.setState({buttonTextColor:  'rgb(255,255,255)'})
            this.setState({buttonDisabled: false})
          } else {
            this.setState({buttonBackground: 'rgb(204,204,204)'})
            this.setState({buttonTextColor:  'rgb(124,124,124)'})
            this.setState({buttonDisabled: true})
          }
          break
        case 2:
          this.setState({buttonBackground: 'rgb(204,204,204)'})
          this.setState({buttonTextColor:  'rgb(124,124,124)'})
          this.setState({buttonDisabled: true})
          break
        case 3:
          if (this.state.from.length > 0) {
            this.setState({buttonBackground: 'rgb(46,128,237)'})
            this.setState({buttonTextColor:  'rgb(255,255,255)'})
            this.setState({buttonDisabled: false})
          } else {
            this.setState({buttonBackground: 'rgb(204,204,204)'})
            this.setState({buttonTextColor:  'rgb(124,124,124)'})
            this.setState({buttonDisabled: true})
          }
          break
        case 4:
          this.setState({buttonBackground: 'rgb(46,128,237)'})
          this.setState({buttonTextColor:  'rgb(255,255,255)'})
          this.setState({buttonDisabled: false})
          break
      }
    }

    async _animationHandler() {
        this._buttonHandler()

        switch (this.state.currentStep._value) {
            case 1:
                this.setState({buttonText: "Looking good 👌" })
                break
            case 2:
                this.setState({buttonText: "Onward! 🙌" })
                break
            case 3:
                this.setState({buttonText: "Cool 😎" }, () => this._getPreviewRoute())
                break
        }

        if (this.state.currentStep._value == 4) {
            // this.setState({
            //     inputs: {
            //         to:   this.state.to,
            //         from: this.state.from,
            //         // when: this.state.when,
            //         name: this.state.inputsName
            //     }
            // })

            try {
                await AsyncStorage.setItem('@Routes:initial', this.state.inputs.to)
                this.props.navigator.push({ id: 'dashboard' })
            } catch (error) {
                console.log(error) // TODO: This should probably be more robust
            }
        } else {
            if (true) { // select input this.state.currentStep._value, determine if input!=null
                let nextVal = this.state.currentStep._value + 1
                Animated.timing(this.state.currentStep, {
                    toValue: nextVal,
                    duration: 400
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
                <Animated.View style={[styles.inputsWrapper, {marginLeft: this.state.inputsWrapper.marginLeft}]}>
                    <Input style={styles.input} placeholder='1234 Anydrive Road' setText={(text) => {
                      this.setState({to: text}, () => this._buttonHandler())
                    }}>Where are you going?</Input>

                    <View style={styles.superInput}>
                        <Text style={[styles.text, styles.input]}>When do you need to be there?</Text>
                        <DatePickerIOS style={styles.input} date={this.state.when} mode='time' minuteInterval={15} onDateChange={(banana) => this.setState({when: banana}, () => console.log(this.state.when))} />
                    </View>

                    <Input style={styles.input} placeholder='1234 Anydrive Road' setText={(text) => {
                      this.setState({from: text}, () => this._buttonHandler())
                    }}>Where do you leave from?</Input>

                    <View style={styles.superInput}>
                        <Text style={[styles.text, styles.input, {marginVertical: 32}]}>This is what you'll see at {this.state.notifTime} every workday.</Text>
                        <View style={[styles.previewElement, styles.input]}>
                            <Text style={styles.previewElementText}>Leave in 15 minutes to arrive on time, taking {this.state.routeSummary}. Drive time is {this.state.driveTime}</Text>
                        </View>
                    {/* <Preview></Preview> TODO: Build the preview component,
                        and pass in target address, and arrival time; will need
                        to hit the API. */}
                    </View>
                </Animated.View>
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
                    <View style={styles.parentContainer}>{ content }</View>
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
                        style={[styles.button, {backgroundColor: this.state.buttonBackground}]}
                        disabled={this.state.buttonDisabled}
                    >
                        <Text style={[styles.buttonText, {color: this.state.buttonTextColor}]}>{this.state.buttonText}</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(255,255,255)',
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
        color: 'rgb(35,35,35)',
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
        backgroundColor: 'rgb(46,128,237)'
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 20,
        color: 'rgb(255,255,255)'
    },
    parentContainer: {
        flexWrap: 'nowrap',
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        overflow: 'hidden',
        alignSelf: 'stretch',
        backgroundColor: 'transparent'
    },
    inputsWrapper: {
        flexDirection: 'row',
        width: (4*(Dimensions.get('window').width))
    },
    text: {
        fontSize: 20,
        textAlign: 'left',
        marginVertical: 5,
        marginHorizontal: 30,
        color: 'rgb(35,35,35)'
    },
    input: {
        width: (Dimensions.get('window').width -60),
        marginHorizontal: 30
    },
    previewElement: {
        width: (Dimensions.get('window').width -60),
        padding: 30,
        backgroundColor: 'rgb(46,128,237)',
        borderRadius: 8,
        shadowColor: 'rgb(35,35,35)',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowOffset: {width: 0, height: 8}
    },
    previewElementText: {
        color: 'rgb(255,255,255)'
    }
})

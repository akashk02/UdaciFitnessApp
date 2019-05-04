import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { getMetricMetaInfo, timeToString, getDailyReminderValue } from '../utils/helpers'
import UdaciSteppers from './UdaciSteppers'
import UdaciSlider from './UdaciSlider'
import DateHeader from './DateHeader'
import { Ionicons } from '@expo/vector-icons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import TextButton from './TextButton'
import { submitEntry, removeEntry } from '../utils/Api'
import { connect } from 'react-redux'
import { addEntry } from '../Actions'

function SubmitButton({ onPress }) {
    return (
        <TouchableOpacity
            onPress={onPress}>
            <Text>SUBMIT</Text>

        </TouchableOpacity>
    )
}

class AddEntry extends Component {

    state = {
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0

    }

    increment = (metric) => {
        const { step, max } = getMetricMetaInfo(metric);
        this.setState((state) => {
            let count = state[metric] + step;
            return {
                ...state,
                [metric]: count > max
                    ? max
                    : count

            }
        });

    }

    decrement = (metric) => {
        const { step } = getMetricMetaInfo(metric);
        this.setState((state) => {
            let count = state[metric] - step;
            return {
                ...state,
                [metric]: count < 0
                    ? 0
                    : count
            }
        });

    }

    slide = (metric, value) => {
        this.setState(() => (
            {
                [metric]: value
            }
        ))
    }

    submit = () => {
        key = timeToString();
        entry = this.state;

        //update  redux
        this.props.dispatch(addEntry({
            [key]: entry
        }))

        this.setState(() => ({
            run: 0,
            bike: 0,
            swim: 0,
            sleep: 0,
            eat: 0
        }))



        //navigate to homescreen

        submitEntry({ key, entry });

        //clear local notification
    }

    reset = () => {
        key = timeToString();

        // update to redux
        this.props.dispatch(addEntry({
            [key]: getDailyReminderValue,
        }))

        //route to home

        removeEntry({ key })
    }




    //Alternate Method

    // slide = (metric, value) => {
    //     this.setState((state) => (
    //         {
    //             ...state,
    //             [matric]: value
    //         }
    //     ))
    // }

    render() {

        if (this.props.alreadyLogged) {
            return (
                <View>
                    <Ionicons name={"ios-happy"} size={100}></Ionicons>
                    <Text>You have already logged your information</Text>
                    <TextButton onPress={this.reset}>RESET</TextButton>
                </View>
            )
        }



        const metaInfo = getMetricMetaInfo();
        console.log('keys =', Object.keys(metaInfo))
        return (
            <View>


                <DateHeader date={
                    (new Date()).toLocaleDateString()}
                ></DateHeader>

                <View>{Object.keys(metaInfo).map((key) => {
                    console.log('inside obj.keys')

                    const { getIcon, type, ...rest } = metaInfo[key]
                    const value = this.state[key];

                    return (

                        <View class={key}>
                            {getIcon()}
                            {type === 'steppers'
                                ? <UdaciSteppers
                                    value={value}
                                    onIncrement={() => this.increment(key)}
                                    onDecrement={() => this.decrement(key)}
                                    {...rest}>
                                </UdaciSteppers>
                                : <UdaciSlider
                                    value={value}
                                    onChange={(value) => this.slide(key, value)}
                                    {...rest}
                                >
                                </UdaciSlider>}

                        </View>

                    )

                })}
                    <SubmitButton
                        onPress={this.submit}>
                    </SubmitButton>
                </View>
            </View>
        )





    }
}

function mapStateToProps(state) {
    const key = timeToString();
    return {
        alreadyLogged: state[key] && typeof state[key].day === 'undefined'
    }
}

export default connect(mapStateToProps)(AddEntry)
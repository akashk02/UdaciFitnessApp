import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
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
import { purple, white } from '../utils/colors'


function SubmitButton({ onPress }) {
    return (
        <TouchableOpacity style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>SUBMIT</Text>

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
                <View style={styles.center}>
                    <Ionicons
                        name={Platform.OS === "ios" ? "ios-happy" : "md-happy"}
                        size={100}>
                    </Ionicons>
                    <Text>You have already logged your information</Text>
                    <TextButton onPress={this.reset}>RESET</TextButton>
                </View>
            )
        }



        const metaInfo = getMetricMetaInfo();
        console.log('keys =', Object.keys(metaInfo))
        return (
            <View style={styles.container}>


                <DateHeader date={
                    (new Date()).toLocaleDateString()}
                ></DateHeader>

                {Object.keys(metaInfo).map((key) => {
                    console.log('inside obj.keys')

                    const { getIcon, type, ...rest } = metaInfo[key]
                    const value = this.state[key];

                    return (

                        <View style={styles.row} key={key}>
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
        )





    }
}

function mapStateToProps(state) {
    const key = timeToString();
    return {
        alreadyLogged: state[key] && typeof state[key].day === 'undefined'
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: "center"

    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: "center"
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 30,
        paddingRight: 30
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40
    },
    AndroidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: "flex-end",
        justifyContent: "center",
        alignItems: "center"
    },
})


export default connect(mapStateToProps)(AddEntry)
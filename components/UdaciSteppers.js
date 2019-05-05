import React, { Component } from 'react'
import { Text, View, Platform, TouchableOpacity, StyleSheet } from 'react-native'
import { FontAwesome, Entypo } from '@expo/vector-icons'
import { white, purple, gray } from '../utils/colors'

export default function UdaciSteppers({ value, step, max, unit, onIncrement, onDecrement }) {

    return (
        <View style={[styles.row, { justifyContent: 'space-between' }]}>

            {Platform.OS === 'ios' ?
                <View style={styles.row}>
                    <TouchableOpacity style={styles.iosBtn}
                        onPress={onDecrement}>
                        <Entypo
                            name='minus'
                            size={30}
                            color='black'
                        ></Entypo>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iosBtn} onPress={onIncrement}>
                        <Entypo
                            name='plus'
                            size={30}
                            color='black'
                        ></Entypo>
                    </TouchableOpacity>
                </View>
                : <View style={styles.row}>
                    <TouchableOpacity style={styles.androidBtn}
                        onPress={onDecrement}>
                        <FontAwesome
                            name='minus'
                            size={30}
                            color={white}
                        ></FontAwesome>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.androidBtn} onPress={onIncrement}>
                        <FontAwesome
                            name='plus'
                            size={30}
                            color={white}
                        ></FontAwesome>
                    </TouchableOpacity>
                </View>
            }

            <View style={styles.metricCounter}>
                <Text style={{ fontSize: 24, textAlign: "center" }}>{value}</Text>
                <Text style={{ fontSize: 18, color: gray }}>{unit}</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    iosBtn: {
        backgroundColor: white,
        borderColor: purple,
        borderWidth: 1,
        borderRadius: 3,
        padding: 5,
        paddingLeft: 25,
        paddingRight: 25,
    },
    androidBtn: {
        margin: 5,
        backgroundColor: purple,
        padding: 10,
        borderRadius: 2,
    },
    metricCounter: {
        width: 85,
        justifyContent: 'center',
        alignItems: 'center'
    },
})
import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class FlexBox extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.box,]} />
                <View style={[styles.box,]} />
                <View style={[styles.box,]} />
            </View>
        )


    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        flexDirection: 'row',
        alignItems: "flex-start"

    },
    box: {
        height: 50,
        width: 50,
        backgroundColor: '#e76e63',
        margin: 10,
    }
})

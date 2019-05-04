import React, { Component } from 'react'
import { Text, View, Slider } from 'react-native'


export default class UdaciSlider extends Component {

    state = {
        value: 0
    }

    render() {
        const { value, step, onChange, max, unit } = this.props
        return (
            <View>
                <Slider
                    value={value}
                    onValueChange={(value) => onChange(value)}
                    step={step}
                    minimumValue={step}
                    maximumValue={max}
                >
                </Slider>
                <Text>{value}</Text>
            </View>
        )
    }
}
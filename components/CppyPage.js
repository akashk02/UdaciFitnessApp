import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import AddEntry from './components/AddEntry'
import reducer from './Reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

export default class App extends React.Component {



    componentDidMount() {
        console.log('before');
        // debugger;
        console.log('after');
        console.log('add entry =', AddEntry)
    }

    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View >
                    <AddEntry></AddEntry>
                </View>
            </Provider>
        );
    }
}



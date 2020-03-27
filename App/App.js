import React, { Component } from 'react'
import {StatusBar} from 'react-native'

import Login from './Login'
import TodoList from './TodoList'
import TodoDetails from './TodoDetails'

//Redux
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import {persistor,store} from './Redux/store'

//Navigation
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default class Main extends React.Component {

    render(){
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                <StatusBar hidden />
                    <NavigationContainer>
                        <Stack.Navigator>
                            <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
                            <Stack.Screen name="TodoList" component={TodoList} options={{headerShown:false}}/>
                            <Stack.Screen name="TodoDetails" component={TodoDetails} options={{headerShown:false}} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </PersistGate>
            </Provider>
        )
    }
}
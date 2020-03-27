import React, { useState, useEffect, Component, } from 'react';
import { View, Text, StyleSheet, Alert, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { useFocusEffect } from '@react-navigation/native';

const Login = ({ navigation }) => {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [account, setAccount] = useState([])
    const [current, setCurrent] = useState(0)
    const [block,setBlock] = useState(false)

    useFocusEffect(
        React.useCallback(() => {
            const autoLogin = async() => {
                AsyncStorage.getItem('Verify').then(response => {
                    if(response != null && response == 'true')
                        navigation.navigate('TodoList')
                })
            }
            autoLogin()
        }, [])
      );

    useEffect(() => {
        AsyncStorage.getItem('UserAccount').then(response => {
            if (response != null)
                setAccount(JSON.parse(response))
        })
    }, [])

    useEffect(() => {
        let count = account.length - 1
        AsyncStorage.setItem('UserAccount', JSON.stringify(account))
        if (account[count] !== undefined) {
            AsyncStorage.setItem('Current', JSON.stringify(account[count].id))
        }
    }, [account])

    useEffect(() => {
    if(account[current] !== undefined)
        AsyncStorage.setItem('Current', JSON.stringify(account[current].id))
    }, [current])

    const AddUser = () => {
        setBlock(false)
        if (userName === "" || password === "") {
            alert("Field cannot be Empty")
        }
        else {
            if(account.length === 0)
            {
                setAccount((prevAccount) => {
                    return [
                        ...prevAccount,
                        { id: Math.random().toString(), userName: userName, password: password }
                    ]
                })
                setPassword("")
                setUserName("")
                navigation.navigate('TodoList')
            }
            for (let i = 0; i < account.length; i++) {
                if (account[i].userName === userName && account[i].password === password) {
                    setCurrent(i)
                    setBlock(true)
                    setPassword("")
                    setUserName("")
                    navigation.navigate('TodoList')
                }
                else if ((i+1) === account.length && block === false) {
                    setAccount((prevAccount) => {
                        return [
                            ...prevAccount,
                            { id: Math.random().toString(), userName: userName, password: password }
                        ]
                    })
                    setPassword("")
                    setUserName("")
                    navigation.navigate('TodoList')
                }
            }
        }
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.inputBox} value={userName} onChangeText={setUserName} placeholder="User Name"></TextInput>
            <TextInput style={styles.inputBox} value={password} onChangeText={setPassword} placeholder="Password"></TextInput>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText} onPress={AddUser}>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#555555',
        justifyContent: 'center',
        alignItems: 'center'
    },

    inputBox: {
        width: 300,
        backgroundColor: 'rgba(255, 255,255,0.8)',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#333333',
        marginVertical: 10
    },
    button: {
        width: 300,
        backgroundColor: '#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    }
});

import React, { useState, useEffect, Component, } from 'react';
import { View, Text, StyleSheet, Alert, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Header from './Details/Header'
import Title from './Details/Title'
import Content from './Details/Content'
import TimeDate from './Details/TimeDate'

const TodoDetails = ({ navigation }) => {

    const [current, setCurrent] = useState()
    const [Details, setDetail] = useState()
    const [items, setItems] = useState([]);
    const [account, setAccount] = useState([])
    const [userName, setUserName] = useState()
    const [title, setTitle] = useState('')
    const [Description, setDescription] = useState('')
    const [date, setDate] = useState(new Date());
    const [date2, setDate2] = useState(new Date());
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    
    const [StartDate,setStartDate] = useState('')
    const [EndDate,setEndDate] = useState('')

    useEffect(() => {
        AsyncStorage.getItem('UserAccount').then(response => {
            if (response != null)
                setAccount(JSON.parse(response))
        })
    }, [])

    useEffect(() => {
        const GetData = async () => {
            await AsyncStorage.getItem('Current').then(response => {
                if (response != null) {
                    setCurrent(JSON.parse(response));
                }
            });

            await AsyncStorage.getItem('todoDetails').then(response => {
                if (response != null) {
                    setDetail(JSON.parse(response));
                }
            });
        }
        GetData();
    }, []);

    useEffect(() => {
        const GetItem = async () => {
            await AsyncStorage.getItem(`${current}`).then(response => {
                if (response != null) {
                    setItems(JSON.parse(response));
                }
            });
            const newAcc = account.filter((account) => account.id.includes(current))
            setUserName(newAcc[0].userName)
        }

        if (current !== undefined) {
            GetItem();
        }
    }, [current])

    useEffect(() => {
        const GetTitle = async () => {
            const newItem = items.filter((items) => items.id.includes(Details))
            try {
                setTitle(newItem[0].text)
            }
            catch (error) {
                console.log("IS OK")
            }
        }

        GetTitle();
    }, [items])

    useEffect(() => {
        const GetAll = async () => {
            await AsyncStorage.getItem(`${Details}Des`).then(response => {
                if (response != null) {
                    setDescription(JSON.parse(response));
                }
            });
            await AsyncStorage.getItem(`${Details}Start`).then(response => {
                if (response != null) {
                    setStartDate(JSON.parse(response));
                }
            });
            await AsyncStorage.getItem(`${Details}End`).then(response => {
                if (response != null) {
                    setEndDate(JSON.parse(response));
                }
            });
        }
        GetAll()
    }, [Details])

    useEffect(() => {
        try {
            setStartDate(date.getDate() +"-"+ date.getMonth() + "-" + date.getFullYear())
        } catch (error) {
            console.log(error)
        }
    }, [date])

    useEffect(() => {
        try {
            setEndDate(date2.getDate() + "-" + date2.getMonth() + "-" + date2.getFullYear())
        } catch (error) {
            console.log(error)
        }
    }, [date2])

    const submitTitle = (text) => {
        setTitle(text)
    }

    const submitDescription = (text) => {
        setDescription(text)
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const onChange2 = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow2(Platform.OS === 'ios');
        setDate2(currentDate);
    };

    const showDatepicker = () => {
        setShow(true);
    };

    const showDatepicker2 = () => {
        setShow2(true);
    };

    const SaveAll = () => {
        AsyncStorage.setItem(`${Details}Des`, JSON.stringify(Description))
        AsyncStorage.setItem(`${Details}Start`, JSON.stringify(StartDate))
        AsyncStorage.setItem(`${Details}End`, JSON.stringify(EndDate))
        let objIndex = items.findIndex(item => item.id == Details);
        items[objIndex].text = title;
        setItems(items => {
            return [...items];
        })
        alert("Data Update Success")
    }

    useEffect(() => {
        try {
            AsyncStorage.setItem(`${current}`, JSON.stringify(items))
        } catch (error) {
            console(error)
        }
    },[items])

    return (
        <>
            <View>
                <Header userName={userName} />
                <Title title={title} submitTitle={submitTitle} />
                <Content Description={Description} submitDescription={submitDescription} />
                <TimeDate onChange={onChange} showDatepicker={showDatepicker} date={date} show={show}
                onChange2={onChange2} showDatepicker2={showDatepicker2} date2={date2} show2={show2}
                StartDate={StartDate} EndDate={EndDate}/>
                <View style={{marginTop:80}}>
                    <TouchableOpacity>
                        <Text style={styles.saveView} onPress={SaveAll}>Save</Text>
                        <Text style={styles.saveView} onPress={()=> navigation.navigate('Login')}>Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    saveView: {
        flexDirection: 'row',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
        backgroundColor: 'black',
        color: 'white',
        padding: 12,
        paddingRight: 25,
        paddingLeft: 25,
        fontSize: 20,
        fontWeight: 'bold',
        width:200,
        textAlign:'center'
    },
});

export default TodoDetails;

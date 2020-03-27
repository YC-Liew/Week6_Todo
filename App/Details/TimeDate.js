import React, { useState ,useEffect} from 'react';
import { View, Button, Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';
import DatePicker from '@react-native-community/datetimepicker';

const TimeDate = ({showDatepicker,showDatepicker2,date,date2,show,show2,onChange,onChange2,StartDate,EndDate}) => {

    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.text}>Date</Text>
            </View>
            <View >
                <TouchableOpacity style={styles.btnView}>
                    <Text onPress={showDatepicker} style={styles.btn}>Select Start Date</Text>
                    <Text onPress={showDatepicker2} style={styles.btn2}>Select End Date</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.dateView}>
                <Text style={styles.date}>{StartDate}</Text>
                <Text style={styles.date}>{EndDate}</Text>
            </View>
            {show && (
                <DatePicker
                    testID="datePicker"
                    value={date}
                    mode="date"
                    format="DD-MM-YYYY"
                    display="default"
                    onChange={onChange}
                />
            )}
            {show2 && (
                <DatePicker
                    testID="datePicker"
                    value={date2}
                    mode="date"
                    format="DD-MM-YYYY"
                    display="default"
                    onChange={onChange2}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: 'rgb(100,100,100)',
    },
    text: {
        paddingLeft: 30,
        textAlign: 'left',
        width: 200,
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
        paddingTop: 15
    },
    btnView: {
        flexDirection: 'row',
    },
    btn: {
        backgroundColor: 'black',
        color: 'white',
        margin: 10,
        padding: 8,
        fontSize: 16,
        paddingLeft: 20,
        paddingRight: 20,
        marginLeft: 30,
    },
    btn2: {
        backgroundColor: 'black',
        color: 'white',
        margin: 10,
        padding: 8,
        fontSize: 16,
        paddingLeft: 20,
        paddingRight: 20,
        marginLeft: 20,
    },
    dateView:{
        flexDirection: 'row',
        marginLeft:'auto',
        marginRight:'auto'
    },
    date:{
        marginLeft:30,
        marginRight:40,
        fontSize:25
    }
});


export default TimeDate;
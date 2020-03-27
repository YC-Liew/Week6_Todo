import React, {useState} from 'react';
import { View, StyleSheet, Text , TextInput, TouchableOpacity} from 'react-native';

const Content = ({ Description , submitDescription }) => {

    return (
        <>
        <View style={styles.header}>
            <Text style={styles.text}>Description</Text>
        </View>
        <View style={styles.Full}>
            <TextInput placeholder="Enter Todo Description" onChangeText={(val) => submitDescription(val) } multiline={true} style={styles.Descrip}>
                {Description}
            </TextInput>
        </View>
        </>
    );
};

const styles = StyleSheet.create({
    Descrip:{
        margin:20,
        marginBottom:10,
        width:'auto',
        height:100,
        borderColor: 'black',
        borderWidth:1,
        textAlignVertical:'top',
    },
    Full: {
        height:'auto',
        backgroundColor: 'rgb(200,200,200)',
        paddingBottom: 15
    },
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
    numbertext: {
        color: 'rgb(77,241,153)',
        fontSize: 36,
        paddingTop: 5,
        paddingLeft: 4,
        paddingRight: 4,
    },
    numbertext2: {
        width: 210,
        height:38,
        color: 'black',
        fontSize: 22,
        marginTop: 13,
        borderColor:'black',
        borderWidth:1,
        paddingBottom: 5
    },
    btn : {
        marginLeft: 10,
        paddingTop:6,
        paddingLeft:10,
        width:70,
        height: 35,
        fontSize: 16,
        marginTop: 15,
        backgroundColor : 'black',
        color: 'white'
    }
});

export default Content;
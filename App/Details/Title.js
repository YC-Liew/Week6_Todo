import React, {useState} from 'react';
import { View, StyleSheet, Text , TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Title = ({ title , submitTitle }) => {

    return (
        <View style={styles.header}>
            <Text style={styles.text}>Title</Text>
            <TextInput style={styles.numbertext2} onChangeText={(e) => submitTitle(e)}>{title}</TextInput>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: 'rgb(200,200,200)',
        flexDirection: 'row',
    },
    text: {
        paddingLeft: 30,
        textAlign: 'left',
        width: 110,
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
        paddingTop: 15
    },
    numbertext2: {
        width: 280,
        height:38,
        color: 'black',
        fontSize: 22,
        marginTop: 13,
        borderColor:'black',
        borderWidth:1,
        paddingBottom: 5
    },
});

export default Title;
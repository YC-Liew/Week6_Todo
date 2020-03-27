import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Header = ({userName}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>User</Text>
      <Text style={styles.numbertext2}>{userName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    header: {
      height: 80,
          paddingTop: 10,
          backgroundColor:'rgb(112,116,119)',
          flexDirection: 'row',
    },
    text: {
      paddingLeft: 30,
          textAlign: 'left',
          width:110,
          color: '#fff',
          fontSize: 25,
          fontWeight: 'bold',
          paddingTop: 15
    },
    numbertext: {
      color: 'rgb(77,241,153)',
          fontSize: 36,
          paddingTop: 5,
          paddingLeft:4,
          paddingRight:4,
    },
    numbertext2: {
      color: '#fff',
          fontSize: 25,
          paddingTop: 15,
          color: 'lightgreen'
    }
  });

export default Header;
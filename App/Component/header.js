import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Header = ({totalNumber}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>Todo list</Text>
      <Text style={styles.numbertext}>{totalNumber}</Text>
      <Text style={styles.numbertext2}>个未完成</Text>
    </View>
  );
};

Header.defaultProps = {
  title: 'Todo List',
};

const styles = StyleSheet.create({
  header: {
    height: 80,
        paddingTop: 10,
        backgroundColor:'rgb(112,116,119)',
        flexDirection: 'row',
  },
  text: {
    paddingLeft: 50,
        textAlign: 'left',
        width:280,
        color: '#fff',
        fontSize: 40,
        fontWeight: 'bold',
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
        fontSize: 16,
        paddingTop: 25,
  }
});

export default Header;

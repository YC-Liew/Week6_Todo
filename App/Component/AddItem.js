import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AddItem = ({addItem}) => {
  const [item, setItem] = useState('');
  const clear = '';
  const click = item => {
    temAdd(item);
    setItem('');
  };

  const temAdd = async item => {
    await addItem(item);
  };
  return (
    <View style={styles.header}>
      <TextInput
        placeholder="Add Item..."
        style={styles.input}
        value={item}
        onChangeText={setItem}
      />
      <TouchableOpacity style={styles.button} onPress={() => click(item)}>
        <Text style={styles.btnText}>
          <Icon name="plus" size={20} />
          Add Item
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 60,
    padding: 8,
    fontSize: 16,
  },

  button: {
    backgroundColor: 'rgb(112,116,119)',
    padding: 9,
    margin: 5,
  },

  btnText: {
    color: '#dddddd',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default AddItem;

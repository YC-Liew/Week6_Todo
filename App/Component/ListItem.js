import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  AppState,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';
import Dialog from 'react-native-dialog';

const ListItem = ({item, deleteItem, checkItem, editText, updateImportant}) => {
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState('');

  useEffect(() => {
    AppState.addEventListener('change', handleChange);
  }, []);

  const handleChange = () => {
    setShow(false);
  };

  const buttonClick = () => {
      editText(item.id);
      setEdit('');
  };

  return (
    <View
      style={[
        item.check && item.important === 'red'
          ? styles.importantCheck
          : [
              item.important === 'red'
                ? styles.important
                : styles.importantDefault,
            ],
      ]}>
      <TouchableOpacity style={styles.listItem}>
        <View style={styles.listItemView}>
          <CheckBox
            style={styles.checkbox}
            value={item.check}
            onChange={() => {
              checkItem(item.id, item.check);
            }}
          />
          <Text
            numberOfLines={1}
            style={[styles.listItemText, {textDecorationLine: item.textstyle}]}
            onPress={() => buttonClick(item.id)}>
            {item.text}
          </Text>
          <Icon
            size={30}
            color={item.check && item.important === 'red' ? 'green' : item.important == 'red' ? 'red' : 'black'}
            name="exclamation"
            onPress={() => updateImportant(item.id, item.important)}
          />
          <Icon
            size={30}
            color="firebrick"
            name="remove"
            onPress={() => deleteItem(item.id)}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkBox: {
    marginLeft: 20,
  },
  listItemText: {
    alignItems: 'center',
    fontSize: 25,
    width: 200,
  },
  textinput: {
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  importantDefault: {
    borderColor: 'black',
    borderLeftWidth: 5,
    borderRightWidth: 5,
  },
  important: {
    borderColor: 'red',
    borderLeftWidth: 5,
    borderRightWidth: 5,
  },
  importantCheck: {
    borderColor: 'green',
    borderLeftWidth: 5,
    borderRightWidth: 5,
  },
});

export default ListItem;

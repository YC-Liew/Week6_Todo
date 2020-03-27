import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import Header from './Component/header';
import ListItem from './Component/ListItem';
import AsyncStorage from '@react-native-community/async-storage';
import AddItem from './Component/AddItem';
import {SearchBar} from 'react-native-elements';
import _ from 'lodash';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useFocusEffect } from '@react-navigation/native';

  

const App = ({navigation}) => {

  const useDebounce = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
      const timer = setTimeout(() => {
        setDebounceValue(value);
      }, delay);

      return () => {
        clearTimeout(timer);
      };
    }, [value, delay]);

    return debounceValue;
  };

  // const totalItem = useRef(null);
  const [items, setItem] = useState([]);
  const [itemsArray, setItemsArray] = useState([]);
  const [search, setSearch] = useState();
  const debounceQuery = useDebounce(search, 300);
  const [numberItem, setNumberItem] = useState();
  const [add, setAdd] = useState(true);
  const [change, setChange] = useState(false);
  const [change2, setChange2] = useState(false);
  const [start, setStart] = useState(false);
  const [user, setUser] = useState('HH')
  const [TF,setTF] = useState(false)

  // useFocusEffect(
  //   React.useCallback(() => {
  //     const Wait = async() => {
  //       await AsyncStorage.getItem('Current').then(response => {
  //         if (response != null) {
  //           setUser(JSON.parse(response));
  //           console.log(TF)
  //           setTF(!TF)
  //         }
  //       });
  //     }

  //     Wait()
  //   }, [])
  // );

  const deleteItem = id => {
    setItem(previousItem => {
      return previousItem.filter(item => item.id != id);
    });
    setItemsArray(previousItem => {
      return previousItem.filter(item => item.id != id);
    });
    setAdd(true);
  };

  const checkNumItem = () => {
    if (search) {
      setNumberItem(itemsArray.reduce((a, c) => (!c.check ? ++a : a), 0));
    } else {
      setNumberItem(items.reduce((a, c) => (!c.check ? ++a : a), 0));
    }
  };

  useEffect(() => {
    AsyncStorage.getItem('Current').then(response => {
      if (response != null) {
        setUser(JSON.parse(response));
      }
    });
    AsyncStorage.setItem('Verify', JSON.stringify(true))
  }, []);

  useEffect(() => {
    console.log('yeah i inside lah')
    AsyncStorage.getItem(`${user}`).then(response => {
      if (response != null) {
        setItem(JSON.parse(response));
      }
    });
  }, [user]);

  useEffect(() => {
    AsyncStorage.setItem(`${user}`, JSON.stringify(items));

    checkNumItem();

    if (!search) {
      setItemsArray([...items]);
    }
    if (add) {
      items.sort(sortingArray);
    }

    if (change2) {
      setItem(items => {
        return [...items];
      });
      setChange2(false);
    }
    () => {};
  }, [items]);

  const sortingArray = (a, b) => {
    // Use toUpperCase() to ignore character casing
    const bandA = a.important;
    const bandB = b.important;

    let comparison = 0;
    if (bandA > bandB) {
      comparison = -1;
    } else if (bandA < bandB) {
      comparison = 1;
    }
    return comparison;
  };

  useEffect(() => {
    if (start) {
      checkNumItem();
      setStart(false);
    }
    if (change) {
      setItemsArray(item => item);
      setChange(false);
    }
  }, [itemsArray]);

  useEffect(() => {
    const searchItem = items
      .filter(item => item.text.includes(debounceQuery))
      .map(item => ({
        ...item,
        rank: item.text.indexOf(search),
      }))
      .sort((a, b) => a.rank - b.rank);

    setItemsArray(searchItem);
    setStart(true);
  }, [debounceQuery]);

  const checkItem = (id, check) => {
    // get index
    let objIndex = items.findIndex(item => item.id == id);
    let objIndex2 = itemsArray.findIndex(itemsArray => itemsArray.id == id);
    //change check value

    items[objIndex].check = check ? false : true;
    items[objIndex].textstyle = check ? 'none' : 'line-through';

    if (search) {
      itemsArray[objIndex2].check = check ? false : true;
      itemsArray[objIndex2].textstyle = check ? 'none' : 'line-through';
      setItemsArray(items => {
        return [...items];
      });
    }

    setAdd(true);

    setItem(items => {
      return [...items];
    });
  };

  const updateImportant = (id, important) => {
    let objIndex = items.findIndex(item => item.id == id);

    if (important === 'black') {
      // move element to index 0
      items[objIndex].important = 'red';
    } else if (important === 'red') {
      //move element to last index
      items[objIndex].important = 'black';
    }

    if (search) {
      let objIndex = itemsArray.findIndex(item => item.id == id);
      if (important === 'black') {
        // move element to index 0
        itemsArray[objIndex].important = 'red';
      } else if (important === 'red') {
        //move element to last index
        itemsArray[objIndex].important = 'black';
      }
      itemsArray.sort(sortingArray);
      setItemsArray(items => {
        return [...items];
      });
    }

    setItem(items => {
      return [...items];
    });
    setAdd(true);
  };

  const addItem = text => {
    //if textinput empty

    if (!text) {
      Alert.alert(
        'Error',
        'Please enter an item',
        [{}, {}, {text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } else {
      setAdd(true);
      const newItem = {
        id: Math.random().toString(),
        text: text,
        check: false,
        important: 'black',
        textstyle: 'none',
      };

      setItem([...items, newItem]);

      if (search) {
        setItemsArray([...itemsArray, newItem]);
        setChange(true);
      }

      setChange2(true);
    }
  };

  const editText = (id) => {
    console.log(TF)
    AsyncStorage.setItem('todoDetails', JSON.stringify(id));
    navigation.navigate('TodoDetails')
  }

  const prevLogin = () => {
    navigation.navigate('Login')
    AsyncStorage.setItem('Verify', JSON.stringify(false))
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.back}><Text style={styles.backText} onPress={prevLogin}>Back</Text></TouchableOpacity>
        <Header totalNumber={numberItem} />
        <SearchBar
          placeholder="Type Here..."
          platform="ios"
          onChangeText={setSearch}
          value={search}
        />
        <AddItem addItem={addItem} />
        <FlatList
          keyExtractor={(item, index) => `${index}`}
          data={search ? itemsArray : items}
          renderItem={({item}) => (
            <ListItem
              item={item}
              deleteItem={deleteItem}
              checkItem={checkItem}
              editText={editText}
              updateImportant={updateImportant}
            />
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  back:{
    backgroundColor:'rgb(112,116,119)'
  },
  backText:{
    marginTop:15,
    marginLeft: 20,
    padding:5,
    color:'white',
    fontSize:20,
    backgroundColor:'black',
    width:100,
    textAlign:'center'
  }
});

export default App;

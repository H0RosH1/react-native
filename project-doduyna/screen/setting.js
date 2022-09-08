//React Native Picker
//https://aboutreact.com/react-native-picker/

//import React in our code
import React, { useState } from 'react';

//import all the components we are going to use
import {
  Picker,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import * as Google from 'expo-google-app-auth';
import * as firebase from 'firebase';
import { useNavigation } from '@react-navigation/native';
import { SimpleLineIcons } from '@expo/vector-icons';

function App(props) {
  const user = props.route.params.user.user;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.contain}>
          <Image style={styles.img} source={{ uri: user.photoURL }} />
          <Text style={styles.name}>{user.displayName}</Text>
        </View>
        <View style={styles.menu}>
          <TouchableOpacity
            onPress={() => navigation.navigate('mymovie')}
            style={styles.button_menu}>
            <Fontisto name="ticket" size={24} color="black" />
            <Text style={styles.ticket}>ตั๋วของฉัน</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => firebase.auth().signOut()}
            style={styles.button_menu}>
            <SimpleLineIcons name="logout" size={24} color="#ff3232" />
            <Text style={styles.logout}>ออกจากระบบ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  contain: {
    alignItems: 'center',
    marginBottom: 20,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 90,
    margin: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  menu: {
    borderTopColor: '#f7f3e9',
    borderTopWidth: 2,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
  },
  button_menu: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomColor:"#f4f4f4",
    borderBottomWidth:1.5
  },
  ticket: {
    fontSize: 16,
    fontWeight: '800',
    color: '#777374',
    marginLeft: 8,
  },
  logout: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ff7272',
    marginLeft: 8,
  },
});

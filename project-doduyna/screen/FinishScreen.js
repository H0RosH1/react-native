import * as React from 'react';
import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  Picker,
} from 'react-native';
import Constants from 'expo-constants';
import InputSpinner from 'react-native-input-spinner';
import * as firebase from 'firebase';
import { Card } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import connectFirebase from '../connectFirebase';

function addMovie(username,route) {
  var movie={
    "nameMovie" : route.params.paramKey,
    "cout" : route.params.cout,
    "plan" : route.params.plan,
    "time" : route.params.time,
    
  };
  
  const i = firebase.database().ref('BookMovie/' + username.uid).push(movie).key;
   var movies={
    "nameMovie" : route.params.paramKey,
    "cout" : route.params.cout,
    "plan" : route.params.plan,
    "time" : route.params.time,
    "key" : i
  };
  firebase.database().ref('BookMovie/' + username.uid +'/'+ i ).set(movies);
  console.log(i)
}

const FinishScreen = ({ route ,navigation }) => {

  const username = route.params.user.user;
  addMovie(username,route)
  return (
    
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>ใบสั่งซื้อ</Text>
        <View style={styles.box}>
          <View style={styles.list}>
            <Text style={styles.textlist}>รายการ</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 5,
            }}>
            <Text style={styles.major}>
              ตั๋วหนังเรื่อง 
            </Text>
            <Text style={styles.major}>{route.params.paramKey} {route.params.cout}ใบ</Text>
            
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 5,
            }}>
            <Text style={styles.major}>รอบหนัง</Text>
            <Text style={styles.major}>{route.params.plan}</Text>

          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={styles.major}>วันที่ : </Text>
            <Text style={styles.major}>{route.params.time}</Text>

          </View>
        </View> 
        <Button
            mode="contained"
            style={styles.buttonStyles}
            onPress={() => navigation.navigate('Home')}>
            เสร็จ
        </Button>
      </ScrollView>
     
    </View>
  );
};

export default FinishScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0075ff',
    marginTop: 10,
    marginBottom: 25,
  },
  box: {
    padding: 10,
    minHeight: 350,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 1,
    borderColor: '#20232a',
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  textlist: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0075ff',
  },
  major: {
    fontSize: 18,
    marginLeft:5,
    color: '#0055ff',
  },
  buttonStyles: {
    backgroundColor: '#0075ff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop:10,
  },
});

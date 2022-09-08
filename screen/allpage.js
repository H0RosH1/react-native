import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  Card,
  TouchableOpacity
} from 'react-native';

import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as firebase from 'firebase';
import * as Google from 'expo-google-app-auth';
import { Gyroscope } from 'expo-sensors';

import * as Speech from 'expo-speech';
import Homepage from './HomeScreen';
import Synopsispage from './Synopsispage.js';
import Finishpage from './FinishScreen';
import Setting from './setting';
import MyMovie from './myMovie'; 



const Stack = createStackNavigator();

function Home(props) {
  const user = props.user;
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      
        <Stack.Screen
          name="Home"
          initialParams={{ user: {user} }}
          component={Homepage}
          options={({ navigation, route }) => ({
            title: 'Doduyna',
            headerTitleStyle: {
              fontWeight: '400',
              fontSize: 24,
              
            },
            headerTintColor: '#00BBFF',
            
            headerRight: () => (
            <TouchableOpacity 
                onPress={() => navigation.navigate('Setting')}
                style={{flex: 1, paddingTop: 20, paddingRight: 15}}>
                   <AntDesign name="setting" size={24} color="black" />

                </TouchableOpacity>
          ),
          })}
        />
        <Stack.Screen
          name="Synopsis"
          component={Synopsispage}
          user = {user}
          options={{
            title: '',
            headerTitleStyle: {
              fontWeight: '400',
              fontSize: 24,
            },
            headerTintColor: '#161616',
          }}
        />
        
        <Stack.Screen
          name="Setting"
          component={Setting}
          initialParams={{ user: {user} }}
          options={({props}) => 
            {
              // console.log(user)
              return{
              title: 'Setting',
              headerTitleStyle: {
              fontWeight: '400',
              fontSize: 24,
            },
            headerTintColor: '#161616',
            
            };
            }

          }
        />
        <Stack.Screen
          name="Finishpage"
          component={Finishpage}
          initialParams={{ user: {user} }}
          options={({props}) => 
            {
              // console.log(user)
              return{
              title: 'Setting',
              headerTitleStyle: {
              fontWeight: '400',
              fontSize: 24,
            },
            headerTintColor: '#161616',
            
            };
          }}
        />

        <Stack.Screen
          name="mymovie"
          component={MyMovie}
          user = {user}
          initialParams={{ user: {user} }}
          options={({props}) => 
            {
              return{
              title: 'ตั๋วของฉัน',
              headerTitleStyle: {
              fontWeight: '400',
              fontSize: 24,
            },
            headerTintColor: '#161616',
            
            };
          }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

export default Home;
import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  Card,
} from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import connectFirebase from '../connectFirebase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as Google from 'expo-google-app-auth';
import { Gyroscope } from 'expo-sensors';
import * as Speech from 'expo-speech';


class test extends React.Component {
   static navigationOptions = {
            title: 'Doduyna',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 24,
            },
            headerTintColor: '#00BBFF',
   }

  state = {
    data: [],
  };
  

  componentDidMount(props) {
    const user = this.props.route.params.user.user;
    // console.log(user)
    connectFirebase.firebase
      .database()
      .ref('movies')
      .on('value', (snapshot) => {
        this.setState({
          data: snapshot.val(),
        });
      });
  }

  

  render() {
    const { navigate } = this.props.navigation;
    if (this.state.data.length == 0)
      return (
        <View style={[styles.container,{alignItems:'center'}]}>
          <Text>Loading</Text>
        </View>
      );
      
      return (
        <View style={styles.container}>
          <ScrollView style={styles.top}>
            <FlatList
              data={this.state.data}
              renderItem={({ item }) => (
                <View style={styles.product}>
                  <Image style={styles.image} source={{ uri: item.image }} />
                  <View style={styles.dataMovie}>
                    <Text style={styles.title}> {item.name} </Text>
                    <View style={styles.movie}>
                      <Text style={styles.in_movie}>รอบหนัง</Text>
                      <Text style={styles.in_movie}>
                        <Ionicons
                          name="time-outline"
                          size={18}
                          color="#0075FF"
                        />
                        90 นาที
                      </Text>
                    </View>

                    <View style={styles.timebox}>
                      <Text style={styles.time}>{item.plan[0].time}</Text>
                      <Text style={styles.time}>{item.plan[1].time}</Text>
                      <Text style={styles.time}>{item.plan[2].time}</Text>
                      <Text style={styles.time}>{item.plan[3].time}</Text>
                      <Text style={styles.time}>{item.plan[2].time}</Text>
                    </View>
                  </View>
                  <Button
                    mode="contained"
                    onPress={() => navigate('Synopsis', {
                      paramKey: item.name,
                      plan :[
                        item.plan[0].time,
                        item.plan[1].time,
                        item.plan[2].time,
                        item.plan[3].time,
                      ]
                    })}
                    style={styles.button}>
                    จองตั๋วหนัง
                  </Button>
                </View>
              )}
            />
          </ScrollView>
        </View>
      );
    
  }
}


export default test;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    padding: 8,
  },
  product: {
    flex: 1,
    marginBottom: 35,
    flexDirection: 'row',
    height: 205,
  },
  top: {
    padding: 10,
  },
  image: {
    width: 125,
    height: 180,
    backgroundColor: '#000',
    borderRadius: 10,
  },

  dataMovie: {
    width: 205,
    paddingTop: 15,
  },
  title: {
    color: '#0075FF',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  movie: {
    padding: 8,
    width: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  in_movie: {
    fontSize: 16,
    color: '#0075FF',
  },
  timebox: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxWidth: 400,
    paddingBottom: 30,
  },
  time: {
    fontSize: 12,
    fontWeight: '600',
    width: 55,
    height: 25,
    textAlign: 'center',
    color: '#fff',
    marginRight: 5,
    padding: 4,
    marginBottom: 20,
    backgroundColor: '#0084FF',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#0099ff',
    position: 'absolute',
    borderRadius: 5,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  
    width: 125,
    bottom: 0,
    left: 0,
  },
});

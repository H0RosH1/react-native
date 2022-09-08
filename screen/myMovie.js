import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  Card,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { Button ,IconButton} from 'react-native-paper';
import connectFirebase from '../connectFirebase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as Google from 'expo-google-app-auth';
import { Gyroscope } from 'expo-sensors';
import * as Speech from 'expo-speech';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function remove(key, username) {
  const i = key.key;
  connectFirebase.firebase
    .database()
    .ref(`BookMovie/${username}/${i}`)
    .remove();
}

function confirn(key, username) {
  Alert.alert(
    'คุณต้องการที่จะลบตั๋วหนังหรือไม่ ?',
    '*หมายเหตุ: หากลบแล้วจะไม่สามารถกู้คืนข้อมูลได้ !!!',
    [
      { text: 'Delete', onPress: () => remove(key, username) },
      {
        text: 'Cancel',
        onPress: () => console.log('No delete'),
        style: 'cancel',
      },
    ],
    {
      cancelable: true,
    }
  );
}

class test extends React.Component {
  state = {
    data: [],
  };

  componentDidMount() {
    const { props } = this;
    const username = props.route.params.user.user.uid;
    const what = this.state.data;
    connectFirebase.firebase
      .database()
      .ref('BookMovie/' + username)
      .on('value', (snapshot) => {
        this.setState({
          data: snapshot.val(),
        });
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    const { props } = this;
    const username = props.route.params.user.user.uid;
    const what = this.state.data;
    const mymovie = this.state.yourmovie;
    if (
      this.state.data == [] ||
      this.state.data == null ||
      this.state.data.length == 0
    )
      return (
        <View style={[styles.container, { alignItems: 'center' }]}>
          <Text>ไม่มีตั๋วที่จอง</Text>
        </View>
      );
    if (
      this.state.data != [] &&
      this.state.data != null &&
      this.state.data.length != 0
    ) {
      return (
        <View style={styles.container}>
          <ScrollView>
            <FlatList
              data={Object.values(this.state.data)}
              inverted
              keyExtractor={(item, data) => item.key}
              renderItem={({ item }) => (
                <View
                  style={
                    (styles.ymovie,
                    {
                      backgroundColor: '#fff',
                      borderRadius: 20,
                      marginBottom: 10,
                      padding: 10,
                      borderWidth: 2,
                      borderColor: '#f4f4f4',
                    })
                  }>
                  <View style={styles.movie}>
                    <Text style={styles.major}>เรื่อง</Text>
                    <Text style={styles.major}>{item.nameMovie}</Text>
                  </View>
                  <View style={styles.movie}>
                    <Text style={styles.major}>จำนวนตั๋ว</Text>
                    <Text style={styles.major}>{item.cout} ใบ</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View style={styles.movie}>
                      <Text style={styles.major}>รอบที่จอง</Text>
                      <Text style={styles.major}>{item.plan}</Text>
                    </View>
                    <Text style={(styles.major, styles.left)}>
                      วันที่จอง {item.time}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => confirn(item, username)}>
                   
                    <IconButton
                      icon="trash-can-outline"
                      color='#ff4343'
                      size={28}
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          </ScrollView>
        </View>
      );
    }
  }
}

export default test;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#f6f6f6',
    padding: 8,
  },
  movie: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ymovie: {
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 2,
    padding: 10,
    marginBottom: 10,
  },
  major: {
    fontSize: 18,
    marginLeft: 5,
    color: '#000',
  },
  left: {
    textAlign: 'right',
    color: '#0075FF',
  },
  button: {
    position: 'absolute',
    right: 15,
    top: 20,
  },

});

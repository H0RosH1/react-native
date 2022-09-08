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
import RNPickerSelect from 'react-native-picker-select';
import Constants from 'expo-constants';
import InputSpinner from 'react-native-input-spinner';
import { Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DatePicker from 'react-native-datepicker';

function time(){
  let year = new Date().getFullYear();
  let day = new Date().getDate();
  let month = new Date().getMonth() + 1;
  let now = day +'/'+ month + '/' + year;
  // console.log(now.format("MMM Do YY"))
  return now;
}

const HomeScreen = ({ route, navigation }) => {
  const [plan, setPlan] = useState(route.params.plan[0]);
  const [number, setNumber] = useState(1);
  const [choosenLabel, setChoosenLabel] = useState(route.params.plan[0]);
  const [choosenIndex, setChoosenIndex] = useState('2');
  const [date, setDate] = useState(time());
  
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>ใบสั่งซื้อ</Text>
        <View style={styles.box}>
          <View style={styles.list}>
            <Text style={styles.textlist}>รายการ</Text>
            <Text style={styles.textlist}>จำนวน</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 15,
            }}>
            <Text style={styles.major}>
              ตั๋วหนังเรื่อง {route.params.paramKey}
            </Text>
            <InputSpinner
              max={48}
              min={1}
              step={1}
              style={styles.TextInputStyle}
              height={20}
              onValueChange={(number) => setNumber(number)}
              colorMax={'#40c5f4'}
              colorMin={'#40c5f4'}
              onChange={(number) => setNumber(number)}
            />
          </View>
          
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.major}>รอบหนัง </Text>
            <Picker
              style={{ width: 105 }}
              selectedValue={choosenLabel}
              onValueChange={(itemValue, itemIndex) => {
                setChoosenLabel(itemValue);
                setChoosenIndex(itemIndex);
              }}>
              <Picker.Item
                label={route.params.plan[0]}
                value={route.params.plan[0]}
              />
              <Picker.Item
                label={route.params.plan[1]}
                value={route.params.plan[1]}
              />
              <Picker.Item
                label={route.params.plan[2]}
                value={route.params.plan[2]}
              />
              <Picker.Item
                label={route.params.plan[3]}
                value={route.params.plan[3]}
              />
            </Picker>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={styles.major}>วันที่ </Text>
            <DatePicker
              style={styles.datePickerStyle}
              date={date} // Initial date from state
              mode="date" // The enum of date, datetime and time
              placeholder="select date"
              format="DD/MM/YYYY"
              minDate={time()}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  //display: 'none',
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                },
              }}
              onDateChange={(date) => {
                setDate(date);
              }}
            />
          </View>
        </View>
        
        <Button
          mode="contained"
          style={styles.buttonStyles}
          onPress={() =>
            navigation.navigate('Finishpage', {
              paramKey: route.params.paramKey,
              plan: choosenLabel,
              cout: number,
              time: date
            })
          }>
          ดำเนินการต่อ
        </Button>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

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
  TextInputStyle: {
    width: 65,
    borderBottomWidth: 2,
    borderBottomColor: '#0075ff',
    color: '#0055ff',
    padding: 2,
    textAlign: 'center',
  },
  major: {
    fontSize: 18,
    color: '#0055ff',
  },
  buttonStyles: {
    backgroundColor: '#0075ff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

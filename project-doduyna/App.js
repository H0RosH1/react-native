import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Surface, Button, TextInput } from 'react-native-paper';
import * as firebase from 'firebase';
import * as Google from 'expo-google-app-auth';
import Allpage from './screen/allpage';

console.disableYellowBox = true;

var firebaseConfig = {
  apiKey: 'AIzaSyA-vTHdz69l37DpHR_hTcPWmMaRZVxjiQM',
  authDomain: 'doduyna-4b8b4.firebaseapp.com',
  databaseURL: 'https://doduyna-4b8b4-default-rtdb.firebaseio.com',
  projectId: 'doduyna-4b8b4',
  storageBucket: 'doduyna-4b8b4.appspot.com',
  messagingSenderId: '90725694200',
  appId: '1:90725694200:web:89f15dc0c93fe07ce5590d',
  measurementId: 'G-WQSDPK6BJ2',
};

if (!firebase.inited) {
  firebase.initializeApp(firebaseConfig);
  firebase.inited = true;
}

async function signInWithGoogle() {
  const config = {
    androidClientId:
      '783233955744-628u6nfivv7384binjb4fmdhtcr7i3bt.apps.googleusercontent.com',
    iosClientId:
      '783233955744-r19m2v8hnjjstjoc8nm3gka4u77ujd49.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
  };
  try {
    var res = await Google.logInAsync(config);
    if (res.type == 'success') {
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      // Set persistent auth state
      const credential = firebase.auth.GoogleAuthProvider.credential(
        res.idToken,
        res.accessToken
      );
      global.googleProfileData = await firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential);
      return Promise.resolve(true);
    } else {
      return Promise.reject(false);
    }
  } catch (error) {
    alert(error);
    return Promise.reject(false);
  }
}
function addUserdata(userdata){

  var user={
    "name" : userdata.displayName,
    "email": userdata.email,
  };
  firebase.database().ref('/userdata/'+userdata.uid).set(user);
}


export default function App() {
  const [user, setUser] = React.useState(null);
  const [inited, setInited] = React.useState(false);

  const [userdata, setuserdata] = React.useState(null);
  const [checkuser, setcheckuser] = React.useState(false);

  this.state = {
    email: 'admin@gmail.com',
    password: 'admin999',
  };

  if (!inited) {
    setInited(true);
    firebase.auth().onAuthStateChanged((guser) => {
      setUser(guser);
    });
  }

  if (user != null) {
    
    if (!checkuser) {
      
      firebase
        .database()
        .ref('/userdata/')
        .on('value', (snapshot) => {
          var data = snapshot.val();
          setuserdata(data);
        });
   
      setcheckuser(true);
      if(userdata){
        if(!userdata.[user.uid]){
          addUserdata(user);
        }
      }else{
        addUserdata(user);
      }
      
    }
    return <Allpage user={user} />;
  } else {
    return <LoginScreen />;
  }
}

function LoginScreen() {
  return (
    <Surface style={styles.container}>
      <View style={styles.viewPara}>
        <Text style={styles.paragraph}>Doduyna</Text>
        <Button
          icon="google"
          mode="contained"
          style={styles.buttongoogle}
          onPress={() => signInWithGoogle()}>
          Sign In with Google
        </Button>
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    justifyContent: 'center',
    backgroundColor: '#55BBFF',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFF',
  },
  viewPara: {
    height: 175,
    width: 300,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  buttongoogle: {
    backgroundColor: '#49A6C4',
    borderBottomColor: '#48A3C0',
    borderBottomWidth: 2,
    marginTop: -5,
  },
});

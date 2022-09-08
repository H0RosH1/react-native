import * as firebase from 'firebase';

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

export default {
  app: null,
  firebase: firebase,
  config: firebaseConfig,
}
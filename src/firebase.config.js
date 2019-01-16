// firebase utils
import firebase from 'firebase'

// firebase init goes here
const config = {
    apiKey: "AIzaSyBFOU_6EUOhb32CSKnu_jnTg3BkhOrpWSc",
    authDomain: "paredao-fb31d.firebaseapp.com",
    databaseURL: "https://paredao-fb31d.firebaseio.com/",
    projectId: "paredao-fb31d",
    storageBucket: "paredao-fb31d.appspot.com",
    messagingSenderId: "198921824713"
  };
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()

// date issue fix according to firebase
const settings = {
    timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
//const edicoesCollection = db.collection('edicoes')

export {
    db
}
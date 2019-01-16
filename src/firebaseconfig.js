import firebase from 'firebase'

const config = {apiKey: "AIzaSyBFOU_6EUOhb32CSKnu_jnTg3BkhOrpWSc",
    authDomain: "paredao-fb31d.firebaseapp.com",
    databaseURL: "https://paredao-fb31d.firebaseio.com",
    projectId: "paredao-fb31d",
    storageBucket: "paredao-fb31d.appspot.com",
    messagingSenderId: "198921824713"}
const app = firebase.initializeApp(config) 
    
const db = app.database()
export { db }

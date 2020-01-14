import firebase from 'firebase/app'
import 'firebase/database'

const config = {apiKey: "AIzaSyBFOU_6EUOhb32CSKnu_jnTg3BkhOrpWSc",
    authDomain: "paredao-fb31d.firebaseapp.com",
    databaseURL: "https://paredao-fb31d.firebaseio.com",
    projectId: "paredao-fb31d"}
const app = firebase.initializeApp(config) 
    
const db = app.database()
export { db }

import firebase from 'firebase'

const firebaseApp  = firebase.initializeApp({
    apiKey: "AIzaSyCVpB9rVNuPigXAjI-gf7MTC-Jl3c-VBTQ",
    authDomain: "react-crud-8e4e9.firebaseapp.com",
    databaseURL: "https://react-crud-8e4e9.firebaseio.com",
    projectId: "react-crud-8e4e9",
    storageBucket: "react-crud-8e4e9.appspot.com",
    messagingSenderId: "365570796232",
    appId: "1:365570796232:web:cbdcf18bf045a990cad3fd"
});


const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage();

export {db,auth,storage};



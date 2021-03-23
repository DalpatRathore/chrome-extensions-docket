import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  // USER_CONFIG_DATA_ FROM_FIRESTORE
});
const db = firebaseApp.firestore();
export default db;

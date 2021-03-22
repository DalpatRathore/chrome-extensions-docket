import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  // USER_CONFIG_FIRESTORE_CONFIG_DATA
});
const db = firebaseApp.firestore();
export default db;

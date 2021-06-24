import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import 'firebase/storage';
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

let db = app.firestore();

let auth = app.auth();

// if (process.env.DB_HOST === 'localhost') {
//   db.useEmulator('localhost', 8080);
//   auth.useEmulator('http://localhost:9099/', { disableWarnings: true });
// }

// const provider = new firebase.auth.GoogleAuthProvider();

const storage = app.storage();
export { db, storage, auth, app as default };

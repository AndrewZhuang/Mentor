import { initializeApp } from "firebase/app";
// import firebase from "firebase/app";
import { useCallback, useEffect, useState } from "react";
import {
  getDatabase,
  connectDatabaseEmulator,
  onValue,
  ref,
  update,
} from "firebase/database";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  connectAuthEmulator,
  signInWithCredential,
} from "firebase/auth";
import { getStorage, connectStorageEmulator } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyARv6bbK6G7hHXZMt0Xy0-jEOGAFSHAk3k",
    authDomain: "mentat-hacks.firebaseapp.com",
    projectId: "mentat-hacks",
    storageBucket: "mentat-hacks.appspot.com",
    messagingSenderId: "805921278932",
    appId: "1:805921278932:web:a1b5fd223cd5c932e22441",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
const storage = getStorage();

export const useDbData = (path) => {
    const [data, setData] = useState();
    const [error, setError] = useState(null);
  
    useEffect(
      () =>
        onValue(
          ref(database, path),
          (snapshot) => {
            setData(snapshot.val());
          },
          (error) => {
            setError(error);
          }
        ),
      [path]
    );
  
    return [data, error];
  };

  const makeResult = (error) => {
    const timestamp = Date.now();
    const message =
      error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
    return { timestamp, error, message };
  };
  
  export const useDbUpdate = (path) => {
    const [result, setResult] = useState();
    const updateData = useCallback(
      (value) => {
        update(ref(database, path), value)
          .then(() => setResult(makeResult()))
          .catch((error) => setResult(makeResult(error)));
      },
      [database, path]
    );
  
    return [updateData, result];
  };
  
  export default storage;
  
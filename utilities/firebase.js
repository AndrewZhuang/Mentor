import { useEffect, useState, useCallback } from "react";
import {
  getDatabase,
  onValue,
  ref,
  update,
  connectDatabaseEmulator,
} from "firebase/database";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  connectAuthEmulator,
  signInWithCredential,
} from "firebase/auth";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyDX7ko3WxiyAipb6Ik6FfG_zTeD9DnMSrQ",
  authDomain: "mentor-2d730.firebaseapp.com",
  projectId: "mentor-2d730",
  storageBucket: "mentor-2d730.appspot.com",
  messagingSenderId: "845853734017",
  appId: "1:845853734017:web:f36933aa534cc739278980"
};

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const database = getDatabase(firebase);

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
    [path]
  );
  return [updateData, result];
};

export const useAuthState = () => {
  const [user, setUser] = useState();

  useEffect(() => onAuthStateChanged(getAuth(firebase), setUser), []);

  return [user];
};

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));
export { firebaseSignOut as signOut, database };

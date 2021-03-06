/* eslint-disable prettier/prettier */
import {initializeApp} from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

const firebaseConfig = {
  apiKey: 'AIzaSyALWJDjGJ4PDcJ5j7XZewfcdtlbwsQAxsw',
  authDomain: 'safetrack-579c5.firebaseapp.com',
  projectId: 'safetrack-579c5',
  storageBucket: 'safetrack-579c5.appspot.com',
  messagingSenderId: '1016427529309',
  appId: '1:1016427529309:web:57584804a491e3f4ce39b4',
  webClientId:'1016427529309-mkufc642gef0e1tl9g1sl5t5st4b7t65.apps.googleusercontent.com',
  webClientSecret:'AqhdpZ_2WMgRAzWvfnN3nsfU',
};
GoogleSignin.configure(firebaseConfig);

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export function passAuth() {
  return auth;
}
export function testAPP() {
  console.log(app);
}

export function checkLoggedIn() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log('user logged in', uid);
      global.USERID = uid;
    } else {
      console.log('no user logged in');
    }
  });
}

export const signUpUser = async (email, password) => {
  try {
    createUserWithEmailAndPassword(auth, email, password).then((result) => {
      const user = result.user;
      console.log(user);
      return user;
    });
  } catch (error) {
    console.log('error', error);
    return error;
  }
};

export const sendEmailWithPassword = async (email) => {
  try {
    await sendPasswordResetEmail(email);
    console.log('success');
    return {};
  } catch (error) {
    console.log(error);
    return {
      error: error.message,
    };
  }
};

export const signInUser = async (email, password) => {};

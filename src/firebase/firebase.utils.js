import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config={
    apiKey: "AIzaSyAGpvOUTxso9kgCL0HLPmU4JZpJjA1Gqes",
    authDomain: "crwn-db-9e695.firebaseapp.com",
    projectId: "crwn-db-9e695",
    storageBucket: "crwn-db-9e695.appspot.com",
    messagingSenderId: "567735317019",
    appId: "1:567735317019:web:81cc2fd3e79dafbe25febe",
    measurementId: "G-2NBJWXG25X"
  };

  export const createUserProfileDocument = async(userAuth,additionalData)=>{
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error){
        console.log('Error creating User',error.message)
      }
    }
    return userRef;
  }
  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();

  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
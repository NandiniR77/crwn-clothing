import firebase from 'firebase/app';
//pull in the utility library that exists at firebase/app
import 'firebase/firestore'; //database
import 'firebase/auth';

const config = {
        apiKey: "AIzaSyAi3_KyvqFCmNECTnXxGEXIAHJXkv_MBGQ",
        authDomain: "crwn-db-c3035.firebaseapp.com",
        databaseURL: "https://crwn-db-c3035.firebaseio.com",
        projectId: "crwn-db-c3035",
        storageBucket: "crwn-db-c3035.appspot.com",
        messagingSenderId: "105422107460",
        appId: "1:105422107460:web:292929f91373f593fe9d11",
        measurementId: "G-LY1JQJEG3D"
}

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

	//query inside of firestore to see if it already exists
	//query asking firestore for some document or collection
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};



//from documentation
export const auth = firebase.auth(); //access to .auth on firebase when we imported firebase/auth
export const firestore = firebase.firestore();

//set up google auth utility
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });//always trigger the google popup whenever this is used
//signInWithPopup takes the provider class from many different types of popups
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;


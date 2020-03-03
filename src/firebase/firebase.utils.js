import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAOmOU9IrY1gFfGB4SipLeP7fZsyjKfCgA",
    authDomain: "clothing-shop-test.firebaseapp.com",
    databaseURL: "https://clothing-shop-test.firebaseio.com",
    projectId: "clothing-shop-test",
    storageBucket: "clothing-shop-test.appspot.com",
    messagingSenderId: "492251333359",
    appId: "1:492251333359:web:585042c4974b1ac4c5511a"
};

//create an user in db using google sign in or usual registration
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = fireStore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
       const {displayName, email } = userAuth;
       const createdAt = new Date();

       try {
           await userRef.set({
               displayName, email, createdAt, ...additionalData
           });
       } catch (e) {
           console.log('error creating user: ', e.message());
       }
    }

    return userRef;
};

/*
* method used to fill/create a collection using the objectsToAdd, first call/create a reference Obj
* from the string 'collectionKey'. Later iterate over the objectsToAdd in order to set() them inside
* the collection.
* batch is use to make only one call to the database, so we do the set to every obj to add inside batch
* and later make a commit of all the sets made.
* */
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = fireStore.collection(collectionKey);

    const batch = fireStore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
};



/*
* the accumulator is an empty array and the collection is the actual element fetched
* from the transformedCollection. So it saves inside the accumulator a clean version
* of the mapped collection using the title as the key and the collection as data.
* */
export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();
        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    });
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//get the utils to manage auth and storage
export const auth = firebase.auth();
export const fireStore = firebase.firestore();

//setting up Google Authentication
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;




// The core Firebase JS SDK is always required and must be listed first
// <script src="https://www.gstatic.com/firebasejs/7.8.0/firebase-app.js"></script>

// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries -->

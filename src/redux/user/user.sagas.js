import { takeLatest, put, all, call } from 'redux-saga/effects';
import UserActionTypes from "./user.types";
import { signInSuccess, signInFailure, signOutSuccess, signOutFailure } from "./user.actions";
import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from "../../firebase/firebase.utils";


function* getSnapshotFromUserAuth(userAuth) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data() }))
    } catch (e) {
        yield put(signInFailure(e))
    }
}

/*
 * Is the same process that we were doing inside the App.js to pass the userSnapShot
 * to the reducer, the put() makes the flow run normally as redux, so there is no
 * blocking or overlapping processes
 * We take the data from signInWithPopup, create a profile in firebase, get the reference,
 * get its snapshot and pass this data to the googleSignInSuccess() fun of the user reducer
 * */
export function* signInWithGoogle() {
    try {
        const {user} = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch (e) {
        yield put(signInFailure(e))
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}


export function* signInWithEmail({payload: {email, password }}) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    } catch (e) {
        yield put(signInFailure(e))
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}


/*
* using firebase he checks if the session is already started with the method getCurrentUser
* if this one is null so return the function if not get the snapshot from the userAuth object and
* return this object to the component to set the state
* */
export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth)
            return;
        yield getSnapshotFromUserAuth(userAuth);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* onCheckUserSession() {
    yield  takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}


/*
* Inside this generator we do the signout API call and if is successful he should call the
* sign out success from the reducer user actions that set the state in the current user to null
* */
export function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch (e) {
        yield put(signOutFailure(e));
    }
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}


export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart)])
}
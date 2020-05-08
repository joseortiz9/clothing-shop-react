import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from "./user.types";

import { signInSuccess, signInFailure } from "./user.actions";

import { auth, googleProvider, createUserProfileDocument } from "../../firebase/firebase.utils";


function* getSnapshotFromUserAuth(userAuth) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data() }))
    } catch (e) {
        yield put(signInFailure(e))
    }
}

/**
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


export function* userSagas() {
    yield all([call(onGoogleSignInStart), call(onEmailSignInStart)])
}
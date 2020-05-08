import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from "./user.types";

import { googleSignInSuccess, googleSignInFailure } from "./user.actions";

import { auth, googleProvider, createUserProfileDocument } from "../../firebase/firebase.utils";

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
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();
        yield put(googleSignInSuccess({id: userSnapshot.id, ...userSnapshot.data() }))
    } catch (e) {
        yield put(googleSignInFailure(e))
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* userSagas() {
    yield all([call(onGoogleSignInStart)])
}
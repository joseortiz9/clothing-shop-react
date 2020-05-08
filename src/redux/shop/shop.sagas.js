import { takeEvery, call, put } from 'redux-saga/effects';

import ShopActionTypes from "./shop.types";
import {convertCollectionsSnapshotToMap, fireStore} from "../../firebase/firebase.utils";
import {fetchCollectionsFailure, fetchCollectionsSuccess} from "./shop.actions";


function* fetchCollectionsAsync() {
    try {
        const collectionRef = fireStore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (e) {
        yield put(fetchCollectionsFailure(e.message));
    }
}

export function* fetchCollectionsStart() {
    yield takeEvery(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}
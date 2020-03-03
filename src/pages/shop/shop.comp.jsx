import React from "react";
import {Route} from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsOverview from "../../components/collections-overview/collections-overview.comp";
import CollectionPage from "../Collection/collection.comp";

import  { fireStore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import {updateCollections} from "../../redux/shop/shop.actions";

class ShopPage extends React.Component {
     unsubscribeFromSnapshot = null;

     componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = fireStore.collection('collections');
        collectionRef.onSnapshot(async snapshot => {
            const collectionMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionMap);
        });
     }

    render() {
        const { match } = this.props;
        return (
            <div className="shop-page">
                <Route exact path={`${match.path}`} component={CollectionsOverview} />
                <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);
import React from "react";
import {Route} from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsOverview from "../../components/collections-overview/collections-overview.comp";
import CollectionPage from "../Collection/collection.comp";

import  { fireStore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import {updateCollections} from "../../redux/shop/shop.actions";

import withSpinner from "../../components/with-spinner/with-spinner.comp";


const CollectionsOverviewWithSpinner = withSpinner(CollectionsOverview);
const CollectionPageWithSpinner = withSpinner(CollectionPage);

class ShopPage extends React.Component {
    state = {
        loading: true
    };

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = fireStore.collection('collections');
        collectionRef.onSnapshot(async snapshot => {
            const collectionMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionMap);
            this.setState({ loading: false });
        });
    }

    render() {
        const { match } = this.props;
        const { loading } = this.state;
        return (
            <div className="shop-page">
                <Route exact
                       path={`${match.path}`}
                       render={ (props) => (
                           <CollectionsOverviewWithSpinner isLoading={loading} {...props}/>
                       )}
                />
                <Route path={`${match.path}/:collectionId`}
                       render={ (props) => (
                           <CollectionPageWithSpinner isLoading={loading} {...props}/>
                       )}
                />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);
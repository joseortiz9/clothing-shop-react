import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";

import {selectIsCollectionLoaded} from "../../redux/shop/shop.selectors";
import withSpinner from "../../components/with-spinner/with-spinner.comp";
import CollectionPage from './collection.comp';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionLoaded
});

const CollectionPageContainer = connect(mapStateToProps)(withSpinner(CollectionPage));

export default CollectionPageContainer;
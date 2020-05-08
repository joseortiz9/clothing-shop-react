import { connect } from 'react-redux';
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import { selectIsFetchingCollections } from "../../redux/shop/shop.selectors";
import withSpinner from "../with-spinner/with-spinner.comp";
import CollectionsOverview from "./collections-overview.comp";

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsFetchingCollections
});

const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    withSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;

/*
* export const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    withSpinner
)(CollectionsOverview);
*
* THEY ARE THE SAME
*
* export const CollectionsOverviewContainer = connect(mapStateToProps)(withSpinner(CollectionsOverview));
*
* */
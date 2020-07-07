import { connect } from 'react-redux';
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import { selectIsFetchingCollections } from "../../redux/shop/shop.selectors";
import withSpinner from "../with-spinner/with-spinner.comp";
import CollectionsOverview from "./collections-overview.comp";

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsFetchingCollections
});

// compose evaluates from right to left, passing the right to the left height order components (withspinner and connect)
// and is the same as writing the code of down
const CollectionsOverviewContainer = compose(connect(mapStateToProps), withSpinner)(CollectionsOverview);

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
import React from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";

import CollectionPreview from "../collection-preview/collection-preview.comp";

import './collections-overview.styles.scss';
import {selectShopCollections} from "../../redux/shop/shop.selectors";


const CollectionsOverview = ({ collections }) => (
    <div className="collections-overview">
        {
            collections.map(({id, ...collectionProps}) => (
                <CollectionPreview key={id} {...collectionProps} />
            ))
        }
    </div>
);


const mapStateToProps = createStructuredSelector({
    collections: selectShopCollections
});

export default connect(mapStateToProps)(CollectionsOverview);
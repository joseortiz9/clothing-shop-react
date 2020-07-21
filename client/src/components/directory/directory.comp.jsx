import React from "react";
import { connect } from "react-redux";

import MenuItem from "../menu-item/menu-item.comp";
import {selectDirectorySections} from "../../redux/directory/directory.selectors";

import './directory.styles.scss';


const Directory = ({ sections }) => (
    <div className="directory-menu">
        {
            sections.map(({id, ...secProps}) => (
                <MenuItem key={id} {...secProps} />
            ))
        }
    </div>
);

const mapStateToProps = state => ({
    sections: selectDirectorySections(state)
});

export default connect(mapStateToProps)(Directory);
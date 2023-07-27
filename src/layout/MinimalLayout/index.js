import PropTypes from 'prop-types';
import React from 'react';

// project imports
import Customization from './../Customization';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//-----------------------|| MINIMAL LAYOUT ||-----------------------//

const MinimalLayout = (props) => {
    const navigate = useNavigate();
 

    return (
        <React.Fragment>
            {props.children}
            <Customization />
        </React.Fragment>
    );
};

MinimalLayout.propTypes = {
    children: PropTypes.node
};

export default MinimalLayout;

import PropTypes from 'prop-types';
import React from 'react';

// project imports
import Customization from './../Customization';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//-----------------------|| MINIMAL LAYOUT ||-----------------------//

const MinimalLayout = (props) => {
    const navigate = useNavigate();
    // useEffect(() => {
    //     setTimeout(() => {
    //         let isAuthenticated = false;
    //         const localStorageData = JSON.parse(JSON.stringify(localStorage.getItem('berry-account')));
    //         if (localStorageData) {
    //             isAuthenticated = localStorageData.token ? true : false;
    //             console.log(isAuthenticated + 'isAuthenticated');
    //             if (!isAuthenticated) {
    //                 // Redirect to the login page
    //                 console.log(isAuthenticated, '-- Private Route');
    //                 return navigate('/login');
    //             } else {
    //                 return navigate('/');
    //             }
    //         } else {
    //             Window.location.reload();
    //             // return navigate('/');
    //         }
    //     }, 1000);
    // }, []);

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

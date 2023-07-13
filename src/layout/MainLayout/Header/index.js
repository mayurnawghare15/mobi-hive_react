import PropTypes from 'prop-types';
import React, { useState } from 'react';

// material-ui
import { makeStyles, ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@mui/material/styles';

import { Avatar, Box, ButtonBase } from '@material-ui/core';

// project imports
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';

// assets
import { IconMenu2 } from '@tabler/icons';
import DarkMode from './DarkMode';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// style constant
const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1
    },
    headerAvatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        transition: 'all .2s ease-in-out',
        background: theme.palette.secondary.light,
        color: theme.palette.secondary.dark,
        '&:hover': {
            background: theme.palette.secondary.dark,
            color: theme.palette.secondary.light
        }
    },
    boxContainer: {
        width: '228px',
        display: 'flex',
        [theme.breakpoints.down('md')]: {
            width: 'auto'
        }
    }
}));

//-----------------------|| MAIN NAVBAR / HEADER ||-----------------------//

const Header = ({ handleLeftDrawerToggle }) => {
    const classes = useStyles();
    const theme = createTheme();
    const navigate = useNavigate()
    // useEffect(() => {
    //     const delay = 300; // Delay in milliseconds

    //     const timer = setTimeout(() => {
    //         const localStorageData = JSON.parse(JSON.stringify(localStorage.getItem("berry-account")));
    //         const isAuthenticated = localStorageData.token ? true : false;
    //         // Code to execute after the delay
    //         if (!isAuthenticated) {
    //             // Redirect to the login page

    //             return navigate('/login');
    //         }
    //     }, delay);

    //     // Cleanup the timer on component unmount
    //     return () => clearTimeout(timer);
    // }, [])


    return (
        <React.Fragment>
            {/* logo & toggler button */}
            <div className={classes.boxContainer}>
                <Box component="span" sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1 }}>
                    <LogoSection />
                </Box>
                <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                    <Avatar variant="rounded" className={classes.headerAvatar} onClick={handleLeftDrawerToggle} color="inherit">
                        <IconMenu2 stroke={1.5} size="1.3rem" />
                    </Avatar>
                </ButtonBase>
            </div>
            {/* header search */}

            <SearchSection theme="dark" />
            {/* Other header components */}

            <div className={classes.grow} />
            <div className={classes.grow} />
            {/* notification & profile */}
            {/* <NotificationSection /> */}

            <div className={theme.spacing(10000)} />
            <DarkMode />
            <ProfileSection />
        </React.Fragment>
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func
};

export default Header;

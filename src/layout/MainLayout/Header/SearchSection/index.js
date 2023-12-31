import React, { useState } from 'react';

// material-ui
import { makeStyles } from '@mui/styles';
import { Avatar, Box, ButtonBase, Card, CardContent, Grid, InputAdornment, OutlinedInput, Popper } from '@mui/material';

// third-party
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state';

// project imports
import Transitions from '../../../../ui-component/extended/Transitions';

// assets
import { IconAdjustmentsHorizontal, IconSearch, IconX } from '@tabler/icons';

// style constant
const useStyles = makeStyles((theme) => ({
    searchControl: {
        width: '300px',
        // marginLeft: '16px',
        paddingRight: '16px',
        paddingLeft: '16px',
        '& input': {
            background: 'transparent !important',
            paddingLeft: '5px !important'
        },
        [theme.breakpoints.down('lg')]: {
            width: '250px'
        },
        [theme.breakpoints.down('md')]: {
            width: '100%',
            marginLeft: '4px',
            background: '#fff'
        }
    },
    startAdornment: {
        fontSize: '1rem',
        color: theme.palette.grey[500]
    },
    headerAvatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        background: theme.palette.secondary.light,
        color: theme.palette.secondary.dark,
        '&:hover': {
            background: theme.palette.secondary.dark,
            color: theme.palette.secondary.light
        }
    },
    closeAvatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        background: theme.palette.orange.light,
        color: theme.palette.orange.dark,
        '&:hover': {
            background: theme.palette.orange.dark,
            color: theme.palette.orange.light
        }
    },
    popperContainer: {
        zIndex: 1100,
        width: '99%',
        top: '-55px !important',
        padding: '0 12px',
        [theme.breakpoints.down('sm')]: {
            padding: '0 10px'
        }
    },
    cardContent: {
        padding: '12px !important'
    },
    card: {
        background: '#fff',
        [theme.breakpoints.down('sm')]: {
            border: 0,
            boxShadow: 'none'
        }
    }
}));

//-----------------------|| SEARCH INPUT ||-----------------------//

const SearchSection = ({handleSearch, searchTerm}) => {
    const classes = useStyles();
    // const [value, setValue] = useState('');

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', ml: 2, mb: 2 }}>
                {/* Move the search box to the end */}
                <Box sx={{ mr: 2 }}>
                    <PopupState variant="popper" popupId="demo-popup-popper">
                        {(popupState) => (
                            <React.Fragment>
                                <Popper {...bindPopper(popupState)} transition className={classes.popperContainer}>
                                    {/* ... (rest of the JSX unchanged) ... */}
                                </Popper>
                            </React.Fragment>
                        )}
                    </PopupState>
                </Box>
                <OutlinedInput
                    className={classes.searchControl}
                    id="input-search-header"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search"
                    startAdornment={
                        <InputAdornment position="start">
                            <IconSearch stroke={1.5} size="1rem" className={classes.startAdornment} />
                        </InputAdornment>
                    }
                    aria-describedby="search-helper-text"
                    inputProps={{
                        'aria-label': 'weight'
                    }}
                />
            </Box>
        </React.Fragment>
    );
};

export default SearchSection;
